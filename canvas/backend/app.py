from flask import Flask, request
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
    assignments = cursor.execute("SELECT assignments.assignment_id, description, due_date, answer FROM student_assignment inner join assignments on student_assignment.assignment_id = assignments.assignment_id").fetchall()
    response_body = {
        "data":assignments
    }
    return json.dumps(response_body)

@app.route('/t_assignments')
def t_assignments():
    assignments = cursor.execute("SELECT assignment_id, description, due_date from assignments").fetchall()
    response_body = {
        "data":assignments
    }
    return json.dumps(response_body)

@app.route('/s_ann')
def s_ann():
    ann = cursor.execute("SELECT * from announcements").fetchall()
    response_body = {
        "data":ann
    }
    return json.dumps(response_body)

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

@app.route('/new_submission', methods=['POST'])
def new_submission():
    req = json.loads(request.data)
    assignment_id = req['assignment_id']
    user_id = req['user_id']
    cursor.execute("UPDATE student_assignment SET status = '{0}' WHERE email = '{1}';".format(newStatus, email))
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
