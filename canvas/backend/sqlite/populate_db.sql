-- Command Line Workflow
-- Within the sqlite directory, run:
--   ~/Desktop/sqlite-tools-win32-x86-3360000/sqlite3.exe (or wherever the sqlite3.exe file is)
--   .read create_db.sql
--   .read populate_db.sql
-- To save the database, run:
--   .save canvas.db

INSERT INTO users VALUES (1, 'username1', 'pwd01', 'Christine Romero', 'username1@uchicago.edu', 'active', 'student', 'security question answer 1', 'security question answer 2', 'security question answer 3');
INSERT INTO users VALUES (2, 'username2', 'pwd02', 'Darren Jones', 'username2@uchicago.edu', 'active', 'student', 'security question answer 1', 'security question answer 2', 'security question answer 3');
INSERT INTO users VALUES (3, 'username3', 'pwd03', 'Jonathan Owens', 'username3@uchicago.edu', 'active', 'student', 'security question answer 1', 'security question answer 2', 'security question answer 3');
INSERT INTO users VALUES (4, 'username4', 'pwd04', 'Karen Thomas', 'username4@uchicago.edu', 'active', 'student', 'security question answer 1', 'security question answer 2', 'security question answer 3');
INSERT INTO users VALUES (5, 'username5', 'pwd05', 'Stephen Simpson', 'username5@uchicago.edu', 'active', 'student', 'security question answer 1', 'security question answer 2', 'security question answer 3');
INSERT INTO users VALUES (6, 'username6', 'pwd06', 'Rafi Almhana', 'username6@uchicago.edu', 'active', 'teacher', 'security question answer 1', 'security question answer 2', 'security question answer 3');
INSERT INTO users VALUES (7, 'username7', 'pwd07', 'Lionel Barrow', 'username7@uchicago.edu', 'active', 'teacher', 'security question answer 1', 'security question answer 2', 'security question answer 3');
INSERT INTO users VALUES (8, 'username8', 'pwd08', 'Stephen Graves', 'username8@uchicago.edu', 'active', 'admin', 'security question answer 1', 'security question answer 2', 'security question answer 3');
INSERT INTO users VALUES (9, 'username9', 'pwd09', 'Glen Adams', 'username9@uchicago.edu', 'inactive', 'student', 'security question answer 1', 'security question answer 2', 'security question answer 3');
INSERT INTO users VALUES (10, 'username10', 'pwd10', 'Kristi Newton', 'username10@uchicago.edu', 'inactive', 'student', 'security question answer 1', 'security question answer 2', 'security question answer 3');
INSERT INTO users VALUES (11, 'username11', 'pwd11', 'Timothy Ng', 'username11@uchicago.edu', 'active', 'teacher', 'security question answer 1', 'security question answer 2', 'security question answer 3');
INSERT INTO users VALUES (12, 'username12', 'pwd12', 'Jessica Lynn', 'username12@uchicago.edu', 'inactive', 'admin', 'security question answer 1', 'security question answer 2', 'security question answer 3');
INSERT INTO users VALUES (13, 'username13', 'pwd13', 'Borja Sotomayor', 'username13@uchicago.edu', 'active', 'teacher', 'security question answer 1', 'security question answer 2', 'security question answer 3');

INSERT INTO courses VALUES (1, 'Web Development', 6, 30, 'This course is intended to prepare students with a general programming background to work on teams producing modern web applications. Students will learn a strong foundation of core web technologies and protocols, an overview of the major design patterns in the history of web development, and a detailed introduction to the current industry standard.');
INSERT INTO courses VALUES (2, 'Cloud Computing', NULL, 40, 'Welcome to Cloud Computing! This course provides an introduction to cloud computing, with a focus on building cloud-deployed web applications.');
INSERT INTO courses VALUES (3, 'Algorithms', 11, 50, 'This course is about the design and analysis of algorithms. Students will be introduced to the basics of algorithms analysis, several algorithm design paradigms, and problems for which there are no known efficient algorithms. Each of these topics will be illustrated by studying problems and the best known algorithms for solving these problems.');
INSERT INTO courses VALUES (4, 'Foundations of Computer Networks', 13, 80, 'This course focuses on the principles and techniques used in the development of networked and distributed software. Topics include programming with sockets; concurrent programming; data link layer (Ethernet, packet switching, 802.11, etc.); internet and routing protocols (IP, IPv6, ARP, intra-domain and inter-domain routing, etc.); end-to-end protocols (UDP, TCP); and other commonly used network protocols and techniques.');

INSERT INTO announcements VALUES (1, 1, '04/04/2022', 'Laptop', 'Hi Class, Make sure you bring your laptop tomorrow to the class. See you all tomorrow!');
INSERT INTO announcements VALUES (2, 1, '04/15/2022', 'Javascript Lecture', 'The recorded lecture is now available on Canvas.');
INSERT INTO announcements VALUES (3, 1, '04/27/2022', 'Final Project', 'Some of you asked me if they can have a group of 3. The answer is Yes. Make sure you find your group of up to 3 people. Send me and TA an email about your group.');
INSERT INTO announcements VALUES (4, 2, '05/25/2022', 'Back on the office hours Zoom at 9pm', 'Hey - I will rejoin the office hours Zoom at 9pm for about 30-45 minutes to provide any last minute help!');
INSERT INTO announcements VALUES (5, 2, '04/14/2022', 'Lecture 3 recording', 'Hey all - I forgot to post a link to the lecture 3 recording; you can see it here: https://uchicago.zoom.us/rec/share/');
INSERT INTO announcements VALUES (6, 3, '05/14/2022', 'Solutions', 'Solutions for material up through the midterm are now available in the Resources section of Ed');
INSERT INTO announcements VALUES (7, 4, '03/23/2022', 'Grading Scheme Survey', 'As you know, this year we switched to a new grading scheme that follows a specifications grading approach. To get more concrete feedback on how this scheme worked out, and how to improve it in future iterations of this and other courses, we have prepared the following anonymous survey, which we encourage you to fill out: https://forms.gle/gNFobGcZwijxgoUz6');

INSERT INTO enrollments VALUES (1, 1, 1);
INSERT INTO enrollments VALUES (2, 1, 2);
INSERT INTO enrollments VALUES (3, 2, 1);
INSERT INTO enrollments VALUES (4, 2, 2);
INSERT INTO enrollments VALUES (5, 3, 3);
INSERT INTO enrollments VALUES (6, 3, 4);
INSERT INTO enrollments VALUES (7, 4, 1);
INSERT INTO enrollments VALUES (8, 4, 4);
INSERT INTO enrollments VALUES (9, 5, 2);
INSERT INTO enrollments VALUES (10, 5, 4);
INSERT INTO enrollments VALUES (11, 10, 1);
INSERT INTO enrollments VALUES (12, 10, 3);
INSERT INTO enrollments VALUES (13, 11, 2);
INSERT INTO enrollments VALUES (14, 11, 3);
INSERT INTO enrollments VALUES (15, 1, 4);

INSERT INTO assignments VALUES (1, 1, '05/09/2022', 100, 'Assignment 5', 'Follow the instructions to get Angular OR React application set up on your machine. Angular: https://angular.io/guide/setup-local . React with JSX https://reactjs.org/docs/add-react-to-a-website.html#optional-try-react-with-jsx . Once your application is ready, submit a screenshot of the browser. The screenshot must show the browser URL, your name, and date/time.');
INSERT INTO assignments VALUES (2, 1, '06/03/2022', 100, 'Final Project', 'Build your own version of Canvas.');
INSERT INTO assignments VALUES (3, 2, '05/02/2022', 2, 'Pre-class Q&A 4 - DyanmoDB paper', 'Read the paper and answer the questions.');
INSERT INTO assignments VALUES (4, 2, '05/25/2022', 145, 'Final Project', 'Our course concludes with the build-out of a fully functional software-as-a-service for genomics annotation. We have been working on components of this Genomics Annotation Service (GAS) that make use of various clouds services running on Amazon Web Services. In this final project we will make the system a little more functionally complete, add capabilities for scaling the application, and integrate with an external cloud service for payments processing.');
INSERT INTO assignments VALUES (5, 3, '05/17/2022', 12, 'Problem Set 7', 'The At-Least-Three Satisfiability problem is: Given a propositional formula, does it have at least three satisfying assignments? Show that At-Least-Three Satisfiability is not known to be solvable in polynomial time, by giving a reduction from one of the problems covered in Lecture 8.');
INSERT INTO assignments VALUES (6, 3, '04/19/2022', 1, 'Reflection II', 'Reflections are meant to give you an opportunity to reflect on your relationship with the course and the things you’re learning. I, the instructor, will be reading and responding to your submissions here, so this will also allow us to establish a dialogue about your learning in this course.');
INSERT INTO assignments VALUES (7, 4, '02/23/2022', 100, 'Project 2 - chitcp', 'In this project you will be implementing the Transmission Control Protocol, as specified in [RFC793]. However, instead of implementing it inside the operating system itself, you will be implementing it inside a system called chiTCP. This system allows you to write socket-based applications that rely on your TCP implementation instead of the one included in your operating system. To do this, chiTCP provides an alternate socket library, chisocket, that provides the same functions as the standard socket library (connect, send, recv, etc.). Although the chisocket functions have the same expected behaviour as the standard socket functions, they do not implement the entire functionality provided by standard sockets (e.g., non-blocking sockets are not supported).');
INSERT INTO assignments VALUES (8, 4, '03/09/2022', 100, 'Project 3 - chirouter', 'In this project you will be implementing a simple IP router capable of routing IPv4 datagrams between multiple networks. This router will have a static routing table, so you will not have to deal with implementing a routing protocol like RIP or OSPF; instead, the project will focus on the routing of IP datagrams. While, at a high level, this just involves receiving IP datagrams and figuring out what interface they should be sent on, this requires building additional functionality before you can actually start routing IP datagrams.');

INSERT INTO student_assignment VALUES (1, 1, 1, 100, 'answer');
INSERT INTO student_assignment VALUES (2, 1, 2, NULL, NULL);
INSERT INTO student_assignment VALUES (3, 1, 3, 2, 'answer');
INSERT INTO student_assignment VALUES (4, 1, 4, NULL, 'answer');
INSERT INTO student_assignment VALUES (5, 2, 1, 98, 'answer');
INSERT INTO student_assignment VALUES (6, 2, 2, NULL, 'answer');
INSERT INTO student_assignment VALUES (7, 2, 3, 2, 'answer');
INSERT INTO student_assignment VALUES (8, 2, 4, NULL, 'answer');
INSERT INTO student_assignment VALUES (9, 3, 5, NULL, 'answer');
INSERT INTO student_assignment VALUES (10, 3, 6, 1, 'answer');
INSERT INTO student_assignment VALUES (11, 3, 7, 90, 'answer');
INSERT INTO student_assignment VALUES (12, 3, 8, 80, 'answer');
INSERT INTO student_assignment VALUES (13, 4, 1, 100, 'answer');
INSERT INTO student_assignment VALUES (14, 4, 2, NULL, NULL);
INSERT INTO student_assignment VALUES (15, 4, 7, 95, 'answer');
INSERT INTO student_assignment VALUES (16, 4, 8, 100, 'answer');
INSERT INTO student_assignment VALUES (17, 5, 3, 100, NULL);
INSERT INTO student_assignment VALUES (18, 5, 4, 100, NULL);
INSERT INTO student_assignment VALUES (19, 5, 7, 1, 'answer');
INSERT INTO student_assignment VALUES (20, 5, 8, NULL, 'answer');
INSERT INTO student_assignment VALUES (21, 1, 7, 100, 'answer');
INSERT INTO student_assignment VALUES (22, 1, 8, 80, 'answer');
