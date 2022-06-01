from flask import Flask, request
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

@app.route('/login', methods=['GET','POST'])
def validate_login():
    req = json.loads(request.data)
    username = req['username']
    password = req['pwd']
    sql = "SELECT password from users WHERE username = '"+username+"';"
    print(sql)
    if cursor.execute(sql).fetchone():   # if the user exists in the database
        matching_password = cursor.execute(sql).fetchone()[0]
    else:   # make matching password 0 so that login always fails
        matching_password = 0
    print(matching_password)
    response_body = {
        "success": password == matching_password
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