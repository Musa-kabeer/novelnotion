import { createContext, useContext, useState } from 'react';

const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
	const [darked, setDarked] = useState(false);

	return (
		<DarkModeContext.Provider value={{ darked, setDarked }}>
			{children}
		</DarkModeContext.Provider>
	);
};

export const useDarkMode = () => {
	const dark = useContext(DarkModeContext);

	if (!dark) throw new Error('Context is been used in a wrong place');

	return dark;
};
