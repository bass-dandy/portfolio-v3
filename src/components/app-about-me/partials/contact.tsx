import React from 'react';

const Contact: React.FC = () => (
	<div>
		Thanks for reading this far! If you would like to contact me, here are a few options:
		<ul>
			<li>
				<a href="mailto:christian.t.dinh@gmail.com">
					christian.t.dinh@gmail.com
				</a>
			</li>
			<li>
				<a
					href="https://github.com/bass-dandy"
					target="blank"
				>
					Github
				</a>
			</li>
			<li>
				<a
					href="https://www.linkedin.com/in/christiandinh/"
					target="blank"
				>
					Linkedin
				</a>
			</li>
		</ul>
		{"I don't ever log in to linkedin if I can help it, so avoid that if possible."}
	</div>
);

export default Contact;
