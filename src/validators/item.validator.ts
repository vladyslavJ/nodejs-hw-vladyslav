import Joi from 'joi';

export const createItemSchema = (req, res, next) => {
	const itemSchema = Joi.object({
		text: Joi.string().min(5).max(150).required(),
		status: Joi.string().min(3).max(25).required(),
	});

	const { error } = itemSchema.validate(req.body, {
		allowUnknown: false,
		abortEarly: false,
	});

	if (error) {
		res.status(400).send(error.details);
		return;
	}

	next();
};

export const updateItemSchema = (req, res, next) => {
    const updItemSchema = Joi.object({
        status: Joi.string().min(3).max(25).required(),
    });

    const { error } = updItemSchema.validate(req.body, {
		allowUnknown: false,
		abortEarly: false,
	});

	if (error) {
		res.status(400).send(error.details);
		return;
	}

    const paramSchema = Joi.object({
		itemId: Joi.number().min(0).required(),
	});

	const { error: paramError } = paramSchema.validate(req.params, {
		allowUnknown: false,
		abortEarly: false,
	});

	if (paramError) {
		res.status(400).send(paramError.details);
		return;
	}
    
	next();
}