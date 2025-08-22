const CategoryComp = () => {
    return(
        <>
        <section className="main-category-section" id="main-category-section">
            <br />
            <br />
            {/* <h1>Category</h1> */}
            <div className="category-section">
            <div className="category-container">
                <div className="category-card">
                    <div className="category-imgBx" data-text="Senior High School">
                        <img src="/assets/images/icon/Senior High School.png" alt="" />
                    </div>
                    <div className="category-content">
                        <div>
                            <h3>Senior High School</h3>
                            <p>Come enter your school in the Geography olympiad and achieve achievements together</p>
                            {/* <a href="#">Read More</a> */}
                        </div>
                    </div>
                </div>
{/* 
                <div className="category-card">
                    <div className="category-imgBx" data-text="University">
                        <img src="./assets/images/icon/University.png" alt="" />
                    </div>
                    <div className="category-content">
                        <div>
                            <h3>University</h3>
                            <p>Join the university Geography Olympiad and show your skills</p>
                        </div>
                    </div>
                </div> */}
            </div>
            </div>
        </section>
        </>
    )
}

export default CategoryComp