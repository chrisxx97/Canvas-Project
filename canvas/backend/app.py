from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import sqlite3, json, time
from datetime import datetime

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


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
    con = connect
    con.row_factory = dict_factory
    cur = con.cursor()
    ann = cur.execute("SELECT s_assignment_id, user_id, assignments.assignment_id, description, points, grade from student_assignment natural join assignments").fetchall()
 
    return jsonify(ann)


@app.route('/users')
def get_users():
    users = cursor.execute("SELECT * FROM users;").fetchall()
@app.route('/users_courses')
def get_users_courses():
    users = cursor.execute("SELECT * FROM users WHERE role != 'admin';").fetchall()
    courses = cursor.execute("SELECT * FROM courses;").fetchall()
    response_body = {
        "users": users,
        "courses": courses
    }
    return json.dumps(response_body)

@app.route('/users/<user_id>')
def get_user(user_id):
    user = cursor.execute("SELECT * FROM users WHERE user_id = {0};".format(user_id)).fetchall()[0]
    response_body = {
        "user": user
    }
    return json.dumps(response_body)

@app.route('/edit_profile/<user_id>', methods=['POST'])
def edit_profile(user_id):
    req = json.loads(request.data)
    newName = req['new_name']
    newEmail = req['new_email']
    msg = ""

    if newName != None and newName != "":
        print(newName)
        cursor.execute("UPDATE users SET full_name = '{0}' WHERE user_id = {1};".format(newName, user_id))
        connect.commit()
        msg = "Your name is now " + newName + "\n"
    if newEmail != None and newEmail != "":
        cursor.execute("UPDATE users SET email = '{0}' WHERE user_id = {1};".format(newEmail, user_id))
        connect.commit()
        msg += "Your email is now " + newEmail
    if (newName == None and newEmail == None) or (newName == "" and newEmail == None) or (newName == None and newEmail == "") or (newName == "" and newEmail == ""):
        msg = "Please enter a new name and/or email"

    response_body = {
        "message": msg
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

@app.route('/new_submission', methods=['GET','POST'])
def new_submission():
    req = json.loads(request.data)
    assignment_id = req['assignment_id']
    description = req['description']
    due_date = req['due_date']
    user_id = req['user_id']
    answer = req['answer']
    cursor.execute(f"UPDATE student_assignment SET answer = '{answer}' where assignment_id = {assignment_id} and user_id = {user_id};")
    connect.commit()
    return {}


@app.route('/new_grade', methods=['GET','POST'])
def new_grade():
    req = json.loads(request.data)
    # assignment_id = req['assignment_id']
    s_assignment_id = req['s_assignment_id']
    # student_id = req['user_id']
    grade = req['grade']
    cursor.execute(f"UPDATE student_assignment SET grade = '{grade}' where s_assignment_id = {s_assignment_id};")
    connect.commit()
    return {}

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
    if user_id == "favicon.ico":
        return {}

    activeStudents = cursor.execute("SELECT * FROM users WHERE status = 'active' AND role = 'student';").fetchall()
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


@app.route('/login', methods=['GET','POST'])
def validate_login():
    req = json.loads(request.data)
    username = req['username']
    password = req['pwd']

    user = cursor.execute("SELECT * FROM users WHERE username = '{0}';".format(username)).fetchall()[0]
    if user[5] == 'inactive':
        response_body = {
            "inactive": True
        }
        return json.dumps(response_body)

    sql = "SELECT password from users WHERE username = '"+username+"';"
    print(sql)
    if cursor.execute(sql).fetchone():   # if the user exists in the database
        matching_password = cursor.execute(sql).fetchone()[0]
    else:   # make matching password 0 so that login always fails
        matching_password = 0
    print(matching_password)

    user = cursor.execute("SELECT user_id, role FROM users WHERE username = '{0}';".format(username)).fetchall()[0]
    user_id = user[0]
    role = user[1]

    response_body = {
        "success": password == matching_password,
        "user_id": user_id,
        "role": role,
        "inactive": False
    }
    return json.dumps(response_body)

@app.route('/signup', methods=['GET','POST'])
@cross_origin()
def sign_up():
    req = json.loads(request.data)
    username, name, pwd, email, confirmPwd, sa1, sa2, sa3, role = req['username'], req['name'], req['pwd'], req['email'], req['confirmPwd'], req['sa1'], req['sa2'], req['sa3'], req['role']

    # assign the next number of student id
    user_id = cursor.execute('SELECT MAX(user_id) from users;').fetchone()[0] + 1
    print(user_id)

    # add the user to database
    cursor.execute("INSERT INTO users (user_id, username, password, full_name, email, status, role, security_question_1, security_question_2, security_question_3) VALUES ("+str(user_id)+", '"+username+"', '"+pwd+"', '"+name+"', '"+email+"', 'inactive', '"+role+"', '"+sa1+"', '"+sa2+"', '"+sa3+"');")
    connect.commit()

    response_body = {
        'success': True
    }
    return json.dumps(response_body)
    
@app.route('/login/AnswerSq', methods=['GET','POST'])
def validate_sq():
    req = json.loads(request.data)
    username, sa1, sa2, sa3, pwd = req['username'], req['sa1'], req['sa2'], req['sa3'], req['pwd']

    # first check if user exists
    user_exists = False

    if cursor.execute("SELECT * from users where username = '"+username+"';").fetchone():
        print('user exists')
        user_exists = True
        # validate security answers
        answer_match = False
        # print(cursor.execute("SELECT * from users where username = '"+username+"';").fetchone())
        if (sa1, sa2, sa3) == cursor.execute("SELECT security_question_1, security_question_2, security_question_3 from users where username = '"+username+"';").fetchone():
            print('validated')
            answer_match = True
            # reset password when user exists and security answers validated
            cursor.execute("UPDATE users SET password = '"+pwd+"' WHERE username = '"+username+"';")
            connect.commit()


    response_body = {
        'user_exists': user_exists,
        'answer_match': answer_match,
        'new_password': cursor.execute("SELECT password from users where username = '"+username+"';").fetchone()[0]
    }

    return json.dumps(response_body)



    # @app.route('/account/<user_name>', methods=['GET'])
    # def get_account_info(user_name):
    #     data = cursor.execute("SELECT * from users where")

@app.route('/enrollment', methods=['POST'])
def enroll():
    req = json.loads(request.data)
    user_id = req['user_id']
    course_to_add = req['course_to_add']

    user = cursor.execute("SELECT * FROM users WHERE user_id = {0};".format(user_id)).fetchall()[0]
    role = user[6]
    course = cursor.execute("SELECT * FROM courses WHERE course_id = {0};".format(course_to_add)).fetchall()[0]
    if role == "teacher":
        if course[2] != None:
            msg = course[1] + " already has an instructor"
        else:
            cursor.execute("UPDATE courses SET instructor_id = {0} WHERE course_id = {1};".format(user_id, course_to_add))
            connect.commit()
            msg = user[3] + " is now the instructor of " + course[1]
    else:
        enrollment = cursor.execute("SELECT * FROM enrollments WHERE user_id = {0} AND course_id = {1};".format(user_id, course_to_add)).fetchall()
        if len(enrollment) > 0:
            msg = user[3] + " is already enrolled in " + course[1]
        else:
            numOfEnrollments = len(cursor.execute("SELECT * FROM enrollments;").fetchall())
            numOfStudentAssignment = len(cursor.execute("SELECT * FROM student_assignment;").fetchall())
            cursor.execute("INSERT INTO enrollments VALUES ({0}, {1}, {2});".format(numOfEnrollments+1, user_id, course_to_add))
            connect.commit()
            assignments = cursor.execute("SELECT * FROM assignments WHERE course_id = {0};".format(course_to_add)).fetchall()
            for a in assignments:
                numOfStudentAssignment += 1
                cursor.execute("INSERT INTO student_assignment VALUES ({0}, {1}, {2}, NULL, NULL);".format(numOfStudentAssignment, user_id, a[0]))
                connect.commit()
            msg = user[3] + " is now enrolled in " + course[1]

    response_body = {
        "message": msg
    }
    return json.dumps(response_body)

