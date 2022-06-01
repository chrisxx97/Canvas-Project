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

@app.route('/users_courses')
def get_users_courses():
    users = cursor.execute("SELECT * FROM users WHERE role != 'admin';").fetchall()
    courses = cursor.execute("SELECT * FROM courses;").fetchall()
    response_body = {
        "users": users,
        "courses": courses
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
