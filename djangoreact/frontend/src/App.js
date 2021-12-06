import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
    <Provider store={store}>
        <Router>
            <Routes>
                <Route exact path='/reset-password' element={<ResetPassword/>} />
                <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />
            </Routes>
        </Router>
    </Provider>
);

export default App;