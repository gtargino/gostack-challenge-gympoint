import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            age: Yup.string().required(),
            weight: Yup.string().required(),
            height: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error:
                    'Student has not created. Please make sure you are entering a valid name, email, age, weight and height',
            });
        }
        const studentExists = await Student.findOne({
            where: { email: req.body.email },
        });

        if (studentExists) {
            return res.status(400).json({ error: 'Student already exists' });
        }

        const { id, name, email } = await Student.create(req.body);

        return res.json({
            id,
            name,
            email,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string()
                .email()
                .required(),
            age: Yup.string(),
            weight: Yup.string(),
            height: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error:
                    'Please make sure you are entering the student email to be updated',
            });
        }

        const studentExists = await Student.findOne({
            where: { email: req.body.email },
        });

        if (!studentExists) {
            return res.status(400).json({ error: 'Student email not existis' });
        }

        const student = studentExists;

        const { id, name, email, age, weight, height } = await student.update(
            req.body
        );

        return res.json({
            id,
            name,
            email,
            age,
            weight,
            height,
        });
    }
}

export default new StudentController();
