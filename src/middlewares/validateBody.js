import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body, {
            abortEarly: false, // зчитуємо всі наявні помилки
        });
        next();
    } catch (err) {
        const error = createHttpError(400, 'Bad Request', {
            errors: err.details, // виводимо деталі всіх знайдених помилок
        });
        next(error);
    }
};
