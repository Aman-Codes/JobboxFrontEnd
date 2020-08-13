// react
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './Form.css';
import './SocialForm.css';


export default function SocialForm() {
    return(
        <React.Fragment>
            <Header />
            <div className="row">
                <div className="col-md-6 mx-auto my-3 ">
                    <div className="card card-body">
                        <h3 className="text-center mb-3">
                            Build Your Profile
                        </h3>
                        <form action="/users/personaldetails" method="POST">
                            <h4 className="text-center mb-3">Social Details</h4>

                            <div className="row social">
                                <div className="col-md-6">
                                    <Link to="/" className="fa fa-facebook"></Link>
                                    <p className="title"> Facebook</p>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/" className="fa fa-twitter"> </Link>
                                    <p className="title"> Twitter</p>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/" className="fa fa-google"> </Link>
                                    <p className="title"> Google</p>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/" className="fa fa-linkedin"></Link>
                                    <p className="title"> Linkedin</p>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/" className="fa fa-github"></Link>
                                    <p className="title"> Github</p>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/" className="fa fa-stack-overflow"></Link>
                                    <p className="title"> Stack-Overflow</p>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/" className="fa fa-quora"></Link>
                                    <p className="title"> Quora</p>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/" className="fa fa-behance"></Link>
                                    <p className="title"> Behance</p>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/" className="fa fa-youtube"></Link>
                                    <p className="title"> Youtube</p>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/" className="fa fa-instagram"></Link>
                                    <p className="title"> Instagram</p>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/" className="fa fa-pinterest"></Link>
                                    <p className="title"> Pinterest</p>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/" className="fa fa-skype"></Link>
                                    <p className="title"> Skype</p>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/" className="fa fa-dribbble"></Link>
                                    <p className="title"> Dribbble</p>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/" className="fa fa-vimeo"></Link>
                                    <p className="title"> Vimeo</p>
                                </div>                                
                            </div>
                            <br/>                          
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
            
    );
}
