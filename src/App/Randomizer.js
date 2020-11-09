/**
 * @description automatically generate
 */
const Randomizer = () => {
	const isCharOrInt = Math.floor(Math.random() * 1);
	const length = 4;
	const finalUserName = [];

	const characterGenerator = () => {
		const random = Math.random()
			.toString(36)
			.replace(/[^a-z]+/g, "")
			.substr(0, 1);
		return random;
	};
	const numberGenerator = () => {
		const random = Math.random() * 10;
		return random;
	};

	while (finalUserName.length !== length) {
		if (isCharOrInt === 0) {
			const char = characterGenerator();
			finalUserName.push(char);
		} else if (isCharOrInt === 1) {
			const number = numberGenerator();
			finalUserName.push(number);
		}
	}
	return finalUserName;
};

export default Randomizer;
