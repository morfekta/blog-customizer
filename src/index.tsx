import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Состояние для управления открытием/закрытием боковой панели
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	// Состояние для управления параметрами статьи
	const [articleStyles, setArticleStyles] = useState(defaultArticleState);

	// Функция для обновления параметров статьи
	const handleApply = (newStyles: typeof defaultArticleState) => {
		setArticleStyles(newStyles);
		setSidebarOpen(false);
	};

	// Функция для сброса параметров статьи к значениям по умолчанию
	const handleReset = () => {
		setArticleStyles(defaultArticleState);
		setSidebarOpen(false);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyles.fontFamilyOption.value,
					'--font-size': articleStyles.fontSizeOption.value,
					'--font-color': articleStyles.fontColor.value,
					'--container-width': articleStyles.contentWidth.value,
					'--bg-color': articleStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggle={() => setSidebarOpen((prev) => !prev)}
				initialValues={articleStyles}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
