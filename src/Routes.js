import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './components/shared/Landing';
import Footer from './components/shared/Footer';

// Recruiter
import RecruiterSignup from './components/Recruiter/auth/Signup';
import RecruiterSignin from './components/Recruiter/auth/Signin';
import RecruiterPrivateRoute from './components/Recruiter/auth/PrivateRoute';
import RecruiterActivate from './components/Recruiter/auth/Activate';

// Recruiter Private
import RecruiterBuildProfile from './components/Recruiter/core/BuildProfile';
import RecruiterJobPosting from './components/Recruiter/core/JobPosting';
import RecruiterMyJobs from './components/Recruiter/core/MyJobs';
import RecruiterAppliedCandidateList from './components/Recruiter/core/AppliedCandidateList';
import RecruiterRejectedCandidateList from './components/Recruiter/core/RejectedCandidateList';
import RecruiterShortListedCandidateList from './components/Recruiter/core/ShortListedCandidateList';
import RecruiterApprovalRequest from './components/Recruiter/core/ApprovalRequest';
import RecruiterChangePassword from './components/Recruiter/core/ChangePassword';
import RecruiterForgot from './components/Recruiter/auth/Forgot';
import RecruiterReset from './components/Recruiter/auth/Reset';

// Recruiter Organisation
import RecruiterCreateOrganisation from './components/Recruiter/organisation/CreateOrganisation';
import RecruiterViewOrganisation from './components/Recruiter/organisation/ViewOrganisation';

// User
import UserSignup from './components/User/auth/Signup';
import UserSignin from './components/User/auth/Signin';
import UserActivate from './components/User/auth/Activate';
import UserPrivateRoute from './components/User/auth/PrivateRoute';
import UserForgot from './components/User/auth/Forgot';
import UserReset from './components/User/auth/Reset';

// User Private
import UserDashboard from './components/User/core/Dashboard';
import UserEducataionForm from './components/User/core/EducationForm';
import UserSocialForm from './components/User/core/SocialForm';
import UserPersonalForm from './components/User/core/PersonalForm';
import UserAchievementForm from './components/User/core/AchievementForm';
import UserWorkExperienceForm from './components/User/core/WorkExperienceForm';
import ChangePassword from './components/User/core/ChangePassword';
import AppliedJobs from './components/User/core/AppliedJobs';
import UserProfile from './components/User/core/UserProfile';
import ProfilePdf from './components/User/core/ProfilePdf';

// Admin
// import AdminSignup from './components/Admin/auth/Signup';
import AdminSignin from './components/Admin/auth/Signin';

// Admin Private
import AdminPrivateRoute from './components/Admin/auth/PrivateRoute';
import AdminDashboard from './components/Admin/core/Dashboard';
import AdminEditJobPost from './components/Admin/core/EditJobPost';
import AdminAppliedCandidateList from './components/Admin/core/AppliedCandidateList';
import AdminApprovalRequest from './components/Admin/core/ApprovalRequest';

// Page Not Found
import Not_found from './components/shared/Not_found'; 

const Routes = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Landing} />

                    <Route exact path="/users/signin" component={UserSignin} />
                    <Route exact path="/users/signup" component={UserSignup} />
                    <Route exact path="/users/auth/password/forgot" component={UserForgot} />
                    <Route exact path="/users/auth/password/reset/:token" component={UserReset} /> 

                    <Route exact path="/recruiter/signin" component={RecruiterSignin} />
                    <Route exact path="/recruiter/signup" component={RecruiterSignup} />
                    <Route exact path="/recruiter/auth/activate/:token" component={RecruiterActivate} />                
                    <Route exact path="/recruiter/auth/password/forgot" component={RecruiterForgot} />
                    <Route exact path="/recruiter/auth/password/reset/:token" component={RecruiterReset} />

                    <RecruiterPrivateRoute exact path="/recruiter/dashboard" component={RecruiterMyJobs} />
                    <RecruiterPrivateRoute exact path="/recruiter/JobPosting" component={RecruiterJobPosting} />
                    <RecruiterPrivateRoute exact path="/recruiter/buildprofile" component={RecruiterBuildProfile} />
                    <RecruiterPrivateRoute exact path="/recruiter/jobs/applied-candidate-list/:jobId" component={RecruiterAppliedCandidateList} />
                    <RecruiterPrivateRoute exact path="/recruiter/jobs/shortlisted-candidate-list/:jobId" component={RecruiterShortListedCandidateList} />
                    <RecruiterPrivateRoute exact path="/recruiter/jobs/rejected-candidate-list/:jobId" component={RecruiterRejectedCandidateList} />
                    <RecruiterPrivateRoute exact path="/recruiter/jobs/approval-request/:jobId"  component={RecruiterApprovalRequest} />
                    <RecruiterPrivateRoute exact path="/recruiter/changepassword"  component={RecruiterChangePassword} />

                    <RecruiterPrivateRoute exact path="/recruiter/organisation/create"  component={RecruiterCreateOrganisation} />
                    <RecruiterPrivateRoute exact path="/recruiter/organisation/view"  component={RecruiterViewOrganisation} />

                    <UserPrivateRoute exact path="/users/dashboard" component={UserDashboard} /> 
                    <UserPrivateRoute exact path="/users/auth/activate/:token" component={UserActivate} />  
                    <UserPrivateRoute exact path="/users/educationdetails" component={UserEducataionForm} />
                    <UserPrivateRoute exact path="/users/personaldetails" component={UserPersonalForm} />
                    <UserPrivateRoute exact path="/users/socialdetails" component={UserSocialForm} />
                    <UserPrivateRoute exact path="/users/achievementdetails" component={UserAchievementForm} />
                    <UserPrivateRoute exact path="/users/workdetails" component={UserWorkExperienceForm} />  
                    <UserPrivateRoute exact path="/users/appliedjobs" component={AppliedJobs} />  
                    <UserPrivateRoute exact path="/users/changepassword" component={ChangePassword} />  
                    <UserPrivateRoute exact path="/users/profile" component={UserProfile} />  
                    <UserPrivateRoute exact path="/users/pdf" component={ProfilePdf} />  

                    <Route exact path="/admin/signin" component={AdminSignin} />
                    {/* <Route exact path="/admin/signup" component={AdminSignup} /> */}

                    <AdminPrivateRoute exact path="/admin/dashboard" component={AdminDashboard} /> 
                    <AdminPrivateRoute exact path="/admin/editjob/:jobId" component={AdminEditJobPost} /> 
                    <AdminPrivateRoute exact path="/admin/jobs/applied-candidate-list/:jobId"  component={AdminAppliedCandidateList} />
                    <AdminPrivateRoute exact path="/admin/jobs/approval-request/:jobId"  component={AdminApprovalRequest} />

                    <Route component = {Not_found} />
                </Switch>
            </BrowserRouter>
            <Footer />
        </Fragment>   
    );
};

export default Routes;