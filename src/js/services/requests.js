const getResources = async url => {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Could not fetch ${url}, status: ${response.status}`);
	}

	// eslint-disable-next-line no-return-await
	return await response.json();
};

const postData = async (url, data) => {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-type": "application/json"
		},
		body: data
	});
	// eslint-disable-next-line no-return-await
	return await res.json();
};

export { getResources, postData };
