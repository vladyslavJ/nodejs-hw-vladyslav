class PermissionException extends Error {
	constructor(msg: string = '') {
		super(msg);
		this.name = 'PermissionException';
	}
}

export default PermissionException;
