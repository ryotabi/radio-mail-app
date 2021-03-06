import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Top from './components/Top';
import Login from './components/Login';
import Register from './components/Register';
import SendMail from './components/SendMail';
import Form from './components/Form';
import List from './components/List';
import Single from './components/Single';
import SaveMail from './components/SaveMail';
import Program from './components/Program';
import Setting from './components/Setting';
import User from './components/User';
import Password from './components/Password';
import Template from './components/Template';
import MyProgram from './components/MyProgram';
import ResetPassword from './components/ResetPassword';
import HowToUse from './components/HowToUse';
import RequestForm from './components/RequestForm';
import Page404 from './components/404';

import './css/reset.css';
import './css/common.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/"              exact component={Top} />
        <Route path="/register"      exact component={Register} />
        <Route path="/login"         exact component={Login} />
        <Route path="/mail"          exact component={SendMail} />
        <Route path="/form"          exact component={Form} />
        <Route path="/list"          exact component={List} />
        <Route path="/single/:id"    exact component={Single} />
        <Route path="/save"          exact component={SaveMail} />
        <Route path="/program"       exact component={Program} />
        <Route path="/setting"       exact component={Setting} />
        <Route path="/user"          exact component={User} />
        <Route path="/password"      exact component={Password} />
        <Route path="/template"      exact component={Template} />
        <Route path="/myProgram"     exact component={MyProgram} />
        <Route path="/resetPassword" exact component={ResetPassword} />
        <Route path="/howToUse"      exact component={HowToUse} />
        <Route path="/request"      exact component={RequestForm} />
        <Route component={Page404} />
      </Switch>
    </Switch>
  </BrowserRouter>
);

export default App;
