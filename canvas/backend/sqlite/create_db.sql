DROP TABLE IF EXISTS announcements;
CREATE TABLE announcements (
    announcement_id INTEGER PRIMARY KEY AUTOINCREMENT, 
	course_id INTEGER NOT NULL, 
	posted_date date NOT NULL,
	title varchar(500), 
	content varchar(5000) NOT NULL, 
	FOREIGN KEY (course_id) REFERENCES courses
);

DROP TABLE IF EXISTS enrollments;
CREATE TABLE enrollments (
    enrollment_id INTEGER PRIMARY KEY, 
	user_id INTEGER NOT NULL, 
	course_id INTEGER NOT NULL, 
	FOREIGN KEY (user_id) REFERENCES users, 
	FOREIGN KEY (course_id) REFERENCES courses
);

DROP TABLE IF EXISTS student_assignment;
CREATE TABLE student_assignment (
    s_assignment_id INTEGER PRIMARY KEY AUTOINCREMENT, 
	user_id INTEGER NOT NULL, 
	assignment_id INTEGER NOT NULL, 
	grade INTEGER, 
	answer varchar(5000), 
	check(grade >= 0), 
	FOREIGN KEY (user_id) REFERENCES users, 
	FOREIGN KEY (assignment_id) REFERENCES assignments
);

DROP TABLE IF EXISTS assignments;
CREATE TABLE assignments (
    assignment_id INTEGER PRIMARY KEY, 
	course_id INTEGER NOT NULL, 
	due_date date NOT NULL,
	points INTEGER NOT NULL,
	title varchar(500), 
	description varchar(5000) NOT NULL, 
	check(points >= 0), 
	FOREIGN KEY (course_id) REFERENCES courses
);

DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
    course_id INTEGER PRIMARY KEY, 
	title varchar(100) NOT NULL, 
	instructor_id INTEGER, 
	capacity INTEGER NOT NULL, 
	description varchar(1000), 
	check(capacity > 0), 
	FOREIGN KEY (instructor_id) REFERENCES users
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
	user_id INTEGER PRIMARY KEY, 
    username varchar(50) NOT NULL UNIQUE, 
	password varchar(5) NOT NULL, 
	full_name varchar(100) NOT NULL, 
	email varchar(120) NOT NULL UNIQUE, 
	status varchar(8) NOT NULL, 
	role varchar(7) NOT NULL, 
	security_question_1 varchar(100) NOT NULL, 
	security_question_2 varchar(100) NOT NULL, 
	security_question_3 varchar(100) NOT NULL,
	check(status IN ('active', 'inactive')), 
	check(role IN ('student', 'teacher', 'admin'))
);
