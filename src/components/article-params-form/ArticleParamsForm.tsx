import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import {
	ArticleStateType,
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

export const ArticleParamsForm = () => {
	// Состояние для управления открытием/закрытием боковой панели
	const [isOpen, setOpen] = useState(false);

	// Состояние для хранения параметров статьи
	const [values, setValues] = useState(defaultArticleState);

	// Ссылка на контейнер формы для отслеживания кликов вне её
	const ref = useRef<HTMLDivElement>(null);

	// Сброс эффектов вне, только когда форма открыта
	useEffect(() => {
		if (!isOpen) return;
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	// При первом монтировании — сразу применяем дефолтные стили
	useEffect(() => {
		applyStyles(defaultArticleState);
	}, []);

	// Утилита: записываем CSS-переменные на корневой элемент
	const applyStyles = (s: ArticleStateType) => {
		const root = document.documentElement.style;
		root.setProperty('--font-family', s.fontFamilyOption.value);
		root.setProperty('--font-size', s.fontSizeOption.value);
		root.setProperty('--font-color', s.fontColor.value);
		root.setProperty('--container-width', s.contentWidth.value);
		root.setProperty('--bg-color', s.backgroundColor.value);
	};

	const handleToggle = () => setOpen((prev) => !prev);

	// Обработчик отправки формы
	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		applyStyles(values);
		setOpen(false);
	};

	// Обработчик сброса формы
	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setValues(defaultArticleState);
		applyStyles(defaultArticleState);
		setOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				ref={ref}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleApply}
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
						<Separator />
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
