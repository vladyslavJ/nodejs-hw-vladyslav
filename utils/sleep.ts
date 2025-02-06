/*
Написати функцію, яка приймає один аргумент, та дозволяє затримати виконання коду на час вказаний, як параметр

await sleep(10_000)
*/

const sleep = (time: number) => {
	return new Promise<void>((res) => setTimeout(res, time));
};

export default sleep;
