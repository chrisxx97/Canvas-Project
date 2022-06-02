from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3, json, time
from datetime import datetime

app = Flask(__name__)
cors = CORS(app)

connect = sqlite3.connect('sqlite/canvas.db', check_same_thread=False)
cursor = connect.cursor()

@app.route('/test')
def my_profile():
    users = cursor.execute("SELECT * FROM users;").fetchall()
    announcements = cursor.execute("SELECT * FROM announcements;").fetchall()
    enrollments = cursor.execute("SELECT * FROM enrollments;").fetchall()
    courses = cursor.execute("SELECT * FROM courses;").fetchall()
    assignments = cursor.execute("SELECT * FROM assignments;").fetchall()
    student_assignment = cursor.execute("SELECT * FROM student_assignment;").fetchall()
    response_body = {
        "users": users,
        "announcements": announcements,
        "enrollments": enrollments,
        "courses": courses,
        "assignments": assignments,
        "student_assignment": student_assignment
    }
    return json.dumps(response_body)

@app.route('/s_assignments')
def s_assignments():
    con = connect
    con.row_factory = dict_factory
    cur = con.cursor()
    assignments = cur.execute("SELECT assignments.assignment_id, description, due_date, answer FROM assignments left join student_assignment on student_assignment.assignment_id = assignments.assignment_id").fetchall()
    return jsonify(assignments)

@app.route('/t_assignments')
def t_assignments():
    con = connect
    con.row_factory = dict_factory
    cur = con.cursor()
    assignments = cur.execute("SELECT assignment_id, description, points, due_date from assignments").fetchall()
    return jsonify(assignments)

@app.route('/s_ann')
def s_ann():
    ann = cursor.execute("SELECT * from announcements").fetchall()
    response_body = {
        "data":ann
    }
    return json.dumps(response_body)


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

@app.route('/t_ann')
def t_ann():
    con = connect
    con.row_factory = dict_factory
    cur = con.cursor()
    ann = cur.execute("SELECT * from announcements").fetchall()

    return jsonify(ann)


@app.route('/s_grade')
def s_grade():
    ann = cursor.execute("SELECT assignments.assignment_id, description, points, grade from student_assignment natural join assignments").fetchall()
    response_body = {
        "data":ann
    }
    return json.dumps(response_body)

@app.route('/t_grade')
def t_grade():
    ann = cursor.execute("SELECT s_assignment_id, user_id, assignments.assignment_id, description, points, grade from student_assignment natural join assignments").fetchall()
    response_body = {
        "data":ann
    }
    return json.dumps(response_body)


@app.route('/users')
def get_users():
    users = cursor.execute("SELECT * FROM users;").fetchall()
    response_body = {
        "users": users
    }
    return json.dumps(response_body)

@app.route('/settings', methods=['POST'])
def change_status():
    req = json.loads(request.data)
    newStatus = req['newStatus']
    email = req['email']
    cursor.execute("UPDATE users SET status = '{0}' WHERE email = '{1}';".format(newStatus, email))
    connect.commit()
    return {}

# @app.route('/new_submission', method=['GET','POST'])
# def new_submission():
#     req = json.loads(request.data)
    # assignment_id = req['assignment_id']
    # description = req['description']
    # due_date = req['due_date']
    # answer = req['answer']
    # cursor.execute(f"UPDATE student_assignment SET answer = '{answer}' where assignment_id = '{assignment_id}';")
    # connect.commit()
    # return {}

@app.route('/new_ann', methods=['POST'])
def new_ann():
    req = json.loads(request.data)
    now = datetime.now() # current date and time
    date_time = now.strftime("%m/%d/%Y")
    content = req['content']
    cursor.execute(f"INSERT INTO announcements (course_id, posted_date, content) Values (1, '{date_time}', '{content}');")
    connect.commit()
    return {}

@app.route('/new_ass', methods=['POST'])
def new_ass():
    req = json.loads(request.data)
    description = req['description']
    due = req['due']
    points = req['points']
    cursor.execute(f"INSERT INTO assignments (course_id, due_date, points, description) Values (1, '{due}', {points}, '{description}');")
    connect.commit()
    return {}

@app.route('/<user_id>')
def dashboard(user_id):
    activeStudents = cursor.execute("SELECT * FROM users WHERE status = 'active' AND role = 'student';").fetchall()
    activeTeachers = cursor.execute("SELECT * FROM users WHERE status = 'active' AND role = 'teacher';").fetchall()
    activeTeachers = cursor.execute("SELECT * FROM users WHERE status = 'active' AND role = 'teacher';").fetchall()
    courses = cursor.execute("SELECT * FROM courses;").fetchall()

    currTimeSeconds = int(time.time())

    teacher_assignments = cursor.execute("SELECT * FROM assignments JOIN courses USING(course_id) \
                                        WHERE instructor_id = " + user_id + ";").fetchall()
    to_be_graded = []
    for a in teacher_assignments:
        dueDate = a[2].split("/")
        dueDateSeconds = datetime(int(dueDate[2]), int(dueDate[0]), int(dueDate[1]), 23, 59).timestamp()
        if (currTimeSeconds - dueDateSeconds >= 0):
            to_be_graded.append(a)

    student_assignments = cursor.execute("SELECT * FROM assignments \
                                        JOIN student_assignment USING(assignment_id) \
                                        JOIN courses USING(course_id) \
                                        WHERE user_id = " + user_id + ";").fetchall()
    todo = []
    upcoming = []
    past = []
    for a in student_assignments:
            dueDate = a[2].split("/")
            dueDateSeconds = datetime(int(dueDate[2]), int(dueDate[0]), int(dueDate[1]), 23, 59).timestamp()
            if (currTimeSeconds - dueDateSeconds >= 0):
                past.append(a)
            elif (dueDateSeconds - currTimeSeconds > 60*60*24*3):
                upcoming.append(a)
            else:
                todo.append(a)

    response_body = {
        "numOfActiveStudents": len(activeStudents),
        "numOfActiveTeachers": len(activeTeachers),
        "numOfCourses": len(courses),
        "to_be_graded": to_be_graded,
        "todo": todo,
        "upcoming": upcoming,
        "past": past
    }
    return json.dumps(response_body)
