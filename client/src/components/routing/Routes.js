import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../routing/PrivateRoute';

import Questions from '../../components/questionsList/Questions'
import Login from '../../components/auth/Login'
import Register from '../../components/auth/Register'
import Profile from '../../components/dashboard/Profile'
import Question from '../../components/questionsList/Question'
import QuestionEdit from '../../components/questionsList/QuestionEdit'
import AnswerEdit from '../../components/questionsList/AnswerEdit'
import AskQuestion from '../../components/questionsList/AskQuestion'
import NotFound from '../../components/layout/NotFound'


const Routes = () => {
    return (
        <Fragment>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/questions" component={Questions} />
                <PrivateRoute exact path='/ask' component={AskQuestion} />
                <PrivateRoute exact path='/dashboard' component={Profile} />
                <PrivateRoute exact path='/detail/:id' component={Question} />
                <PrivateRoute exact path='/detail/edit/:id' component={QuestionEdit} />
                <PrivateRoute exact path='/edit/:id' component={AnswerEdit} />
                <Route component={NotFound} />
            </Switch>
        </Fragment>
    );
};

export default Routes;
