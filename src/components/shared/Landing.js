// react
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import JobPostings from './JobPostings';

// import CountUp, {startAnimation} from 'react-countup';
// import VisibilitySensor from 'react-visibility-sensor';
import $ from 'jquery';

import './Landing.css';

export default function Landing() {

    const counterScroll = () => {
        var a = 0;
        $(window).scroll(function() {
            if(document.getElementById("counter")) {
                var oTop = ($('#counter').offset().top - window.innerHeight);
                if (a === 0 && $(window).scrollTop() > oTop) {
                    $('.counter-value').each(function() {
                    var $this = $(this),
                        countTo = $this.attr('data-count');
                    $({
                        countNum: $this.text()
                    }).animate({
                        countNum: countTo
                        },
                        {
                        duration: 5000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        }
                        });
                    });
                    a = 1;
                }
            }
        });
    }

    counterScroll();

    const history = useHistory();    
    return(
        <React.Fragment>
        <section className="main-section">            
            <div className="main-section-content">
                <div className="search-box-section">
                    <a href="/">Find your dream job</a>
                    <div className="search-box--container">
                        <div className="search-box--item">
                            <input type="text" placeholder=" Eg: Web Developer" />
                        </div>
                        <div className="search-box--item">
                            <input type="text" placeholder=" Type" />
                        </div>
                        <div className="search-box--item">
                            <input type="text" placeholder=" Location" />
                        </div>
                            <div className="search-box--button">
                            <button>Search</button>
                        </div>
                    </div> 
                </div>
            </div>
        </section>
        <section id="job_postings"><JobPostings /></section>        
        {/* <section className="job-count" id="counter">
            <div>
                <h1 className="counter-value" data-count="13000">0</h1>
                <p>JOBS</p>
            </div>
            <div>
                <h1 className="counter-value" data-count="40">0</h1>
                <p>COMPANIES</p>
            </div>
        </section> */}


        <div className="job-count">
            <div className="row text-center" id="counter">
                <div className="col-md-4 pt-5">                
                <i className="fa fa-briefcase fa-3x white" aria-hidden="true"></i>
                <h1 className="counter-value" data-count="0">0</h1>
                <h1>JOBS</h1>
                </div>
                <div className="col-md-4 pt-5">
                <i className="fa fa-building fa-3x white" aria-hidden="true"></i>
                <h1 className="counter-value" data-count="0">0</h1>
                <h1>COMPANIES</h1>
                </div>
                <div className="col-md-4 pt-5">
                <i className="fa fa-users fa-3x white" aria-hidden="true"></i>
                <h1 className="counter-value" data-count="0">0</h1>
                <h1>APPLICANTS</h1>
                </div>
            </div>
            <div className="row text-center" >
                <div className="col-lg-3 col-md-4 col-sm-6 p-5 zoom ">
                <p className="border-white-all "> Web Development <br/> <span>0 +</span> </p>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 p-5 zoom ">
                <p className="border-white-all "> Android Development  <br/> <span>0 +</span> </p>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 p-5 zoom ">
                <p className="border-white-all "> Machine Learning <br/>  <span>0 +</span> </p>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 p-5 zoom">
                <p className="border-white-all"> Data Science  <br/> <span>0 +</span> </p>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 p-5 zoom">
                <p className="border-white-all"> Cyber Security <br/> <span>0 +</span> </p>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 p-5 zoom">
                <p className="border-white-all"> Marketing <br/>  <span>0 +</span> </p>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 p-5 zoom">
                <p className="border-white-all"> Graphic Designing  <br/> <span>0 +</span> </p>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 p-5 zoom">
                <p className="border-white-all"> Many more ... <br/>  </p>
                </div>
            </div>
        </div>
        </React.Fragment>
    
    );
}