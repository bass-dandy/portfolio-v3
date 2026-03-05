import {Button} from '@/components/button';
import styles from './contact.module.css';

const Contact: React.FC = () => (
	<form
		className={styles.form}
		action="https://formspree.io/f/xgolgggk"
		method="POST"
	>
		<label>
			Your email:
			<input
				type="email"
				name="email"
				className={styles.formField}
			/>
		</label>
		<label className={styles.message}>
			Your message:
			<textarea
				name="message"
				className={styles.formField}
			/>
		</label>
		<Button type="submit">
			Send
		</Button>
	</form>
);

export default Contact;
