class TypeException extends Error {
	constructor(msg: string = '') {
		super(msg);
		this.name = 'TypeException';
	}
}

export default TypeException;
