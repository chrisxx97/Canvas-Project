

function App() {
    function openCourseBar() {
      document.getElementById("mySidenav").style.width = "250px";
      // document.getElementById("main").style.marginLeft = "250px";
  }

  function closeCourseBar() {
      document.getElementById("mySidenav").style.width = "0";
      // document.getElementById("main").style.marginLeft= "0";
  }

  return (

    <body>
        <div id="mySidenav" className="sidenav">
            <a href="javascript:void(0)" class="closebtn" onClick={closeCourseBar}>&times;</a>
            <h2> Courses</h2>
            <a href="#">Web Development</a>
            <a href="#">Database</a>
            <a href="#">Distributed Systems</a>
            <a href="#">Object-oriented Programming</a>
        </div>


        <div id="side-menu">
            <div id="logo">
                <a id="logo-a" href="">
                    <img id="logo-img" src="UChicago_Shield_2Color_Maroon_WhiteBorder_RGB.png" alt="logo"/>
                </a>
            </div>
            <div class="menu-item">
                <button>
                    <img src="https://canvas.uchicago.edu/images/messages/avatar-50.png"/>
                    <div>Account</div>
                </button>
            </div>
            <div class="menu-item">
                <button>

                    <div>Dashboard</div>
                </button>
            </div>
            <div class="menu-item">
                <button onClick={openCourseBar}>
                    <img class = "menu-icon" src="course.png"/>

                    <div>Courses</div>
                </button>
            </div>
            <div class="menu-item">
                <button>
                    <div>Settings</div>
                </button>
            </div>
            <div class="menu-item">
                <button>
                    <div>Logout</div>
                </button>
            </div>
        </div>
        
        
    </body>
  );
}

export default App;
