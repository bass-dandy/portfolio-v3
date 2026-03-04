import type {Metadata} from 'next';
import Script from 'next/script';
import type {ProfilePage, WithContext} from 'schema-dts';
import './globals.css';

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
	const schema: WithContext<ProfilePage> = {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		mainEntity: {
			'@type': 'Person',
			name: 'Christian Dinh',
			description: 'Web developer, musician, and (occasional) cosplayer',
			image: 'https://pizza-pizza.pizza/img/about-me/me.jpg',
		},
	};

	return (
		<html>
			<body>
				<Script id="page-schema" type="application/ld+json">
					{JSON.stringify(schema)}
				</Script>
				{children}
			</body>
		</html>
	);
};

export default Layout;

export const metadata: Metadata = {
	metadataBase: new URL('https://pizza-pizza.pizza'),
	title: 'Christian Dinh',
	description: 'Web developer, musician, and (occasional) cosplayer. NOT the photographer, ceramicist, or Squid Games challenger, but if any of them are reading this: hello!',
	creator: 'Christian Dinh',
	keywords: ['Chris Dinh', 'Christian Dinh', 'Software Engineer', 'React', 'TypeScript'],
};
