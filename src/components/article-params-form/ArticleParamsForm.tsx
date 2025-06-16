import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import clsx from 'clsx';

type Props = {
	isOpen: boolean;
	onToggle: () => void;
	initialValues: typeof defaultArticleState;
	onApply: (newStyles: typeof defaultArticleState) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	initialValues,
	onApply,
	onReset,
}: Props) => {
	// Ссылка на контейнер формы для отслеживания кликов вне её
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
				onToggle();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, onToggle]);

	// Состояние для хранения параметров статьи
	const [values, setValues] = useState(initialValues);

	// Обработчик отправки формы
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(values);
	};

	// Обработчик сброса формы
	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setValues(initialValues);
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={ref}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					{/* Шрифт */}
					<div className={styles.field}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={values.fontFamilyOption}
							onChange={(opt) =>
								setValues((v) => ({ ...v, fontFamilyOption: opt }))
							}
							placeholder='Выберите шрифт'
						/>
					</div>

					{/* Размер шрифта */}
					<div className={styles.field}>
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={values.fontSizeOption}
							onChange={(opt) =>
								setValues((v) => ({ ...v, fontSizeOption: opt }))
							}
						/>
					</div>

					{/* Цвет шрифта */}
					<div className={styles.field}>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={values.fontColor}
							onChange={(opt) => setValues((v) => ({ ...v, fontColor: opt }))}
							placeholder='Выберите цвет шрифта'
						/>
					</div>

					{/* Разделитель */}
					<div className={styles.field}>
						<Separator></Separator>
					</div>

					{/* Цвет фона */}
					<div className={styles.field}>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={values.backgroundColor}
							onChange={(opt) =>
								setValues((v) => ({ ...v, backgroundColor: opt }))
							}
							placeholder='Выберите цвет фона'
						/>
					</div>

					{/* Ширина контента */}
					<div className={styles.field}>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={values.contentWidth}
							onChange={(opt) =>
								setValues((v) => ({ ...v, contentWidth: opt }))
							}
							placeholder='Выберите ширину'
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
