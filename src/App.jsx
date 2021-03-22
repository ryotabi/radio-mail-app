import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Top from './components/Top.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import SendMail from './components/SendMail.jsx';
import Form from './components/Form.jsx';
import List from './components/List.jsx';
import Single from './components/Single.jsx';
import SaveMail from './components/SaveMail.jsx';
import Program from './components/Program.jsx';
import Setting from './components/Setting.jsx';
import User from './components/User.jsx';
import Email from './components/Email.jsx';
import Template from './components/Template.jsx';
import MyProgram from './components/MyProgram.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import HowToUse from './components/HowToUse.jsx';

import './css/reset.css';
import './css/common.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/" exact component={Top} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/mail" exact component={SendMail} />
        <Route path="/form" exact component={Form} />
        <Route path="/list" exact component={List} />
        <Route path="/single/:id" exact component={Single} />
        <Route path="/save" exact component={SaveMail} />
        <Route path="/program" exact component={Program} />
        <Route path="/setting" exact component={Setting} />
        <Route path="/user" exact component={User} />
        <Route path="/email" exact component={Email} />
        <Route path="/template" exact component={Template} />
        <Route path="/myProgram" exact component={MyProgram} />
        <Route path="/resetPassword" exact component={ResetPassword} />
        <Route path="/howToUse" exact component={HowToUse} />
      </Switch>
    </Switch>
  </BrowserRouter>
);

export default App;
