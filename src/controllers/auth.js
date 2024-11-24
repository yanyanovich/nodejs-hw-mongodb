import { registerUser, loginUser, logoutUser, refreshUsersSession,requestResetToken, resetPassword } from '../services/auth.js';
import { THIRTY_DAYS } from '../constants/index.js';

export const registerUserController = async (req, res) => {
    const user = await registerUser(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user,
    });
};

const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAYS),
    });
};


export const loginUserController = async (req, res) => {
    const session = await loginUser(req.body);

    setupSession(res, session);

    res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {
            accessToken: session.accessToken,
        },
    });
};


export const logoutUserController = async (req, res) => {
    if (req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    }

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
    const session = await refreshUsersSession({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,
    });

    setupSession(res, session);

    res.json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: {
            accessToken: session.accessToken,
        },
    });
};


export const sendResetEmailController = async (req, res) => {
    await requestResetToken(req.body.email);
    res.json({
        message: 'Reset password email has been successfully sent.',
        status: 200,
        data: {},
    });
};

export const resetPasswordController = async (req, res) => {
    await resetPassword(req.body);
    res.json({
        message: 'Password has been successfully reset.',
        status: 200,
        data: {},
    });
};

