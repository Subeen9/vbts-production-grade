      {/* <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="logo" style={{ position: "absolute", top: "1px" }}>
            <img
              src="/secure.png"
              alt="Secure Logo"
              height="50px"
              width="50px"
            />
          </div>
          <Link
            className="navbar-brand"
            to="/"
            style={{ marginLeft: "55px", color: "orange" }}
          >
            SECURE
          </Link>
          <button
            className="navbar-toggler"
            style={{ paddingBottom: "20px" }}
            type="button"
            onClick={handleToggle}
            aria-expanded={!isCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`bg-dark collapse navbar-collapse${
              isCollapsed ? "" : " show"
            }`}
            id="navbarNavAltMarkup"
          >
            <div onClick={handleToggle} className="bg-dark navbar-nav ms-auto">
              <Link to="/" className="nav-link" aria-current="page">
                Home
              </Link>

              {isAuth ? (
                <>
                  {isApproved && (
                    <>
                      {isAdmin && (
                        <>
                          <Link to="/admindashboard" className="nav-link">
                            Admin
                          </Link>
                        </>
                      )}
                    </>
                  )}
                  <Link
                    className="nav-link"
                    onClick={signUserOut}
                    style={{ cursor: "pointer" }}
                  >
                    Log Out
                  </Link>
                </>
              ) : (
                <Link to="/login" className="nav-link ">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav> */}