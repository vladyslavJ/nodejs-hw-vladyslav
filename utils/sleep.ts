const sleep = (time: number) => {
	return new Promise<void>((res) => setTimeout(res, time));
};

export default sleep;
