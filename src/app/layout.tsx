import './globals.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<html>
		<body>
			{children}
		</body>
	</html>
);

export default Layout;
