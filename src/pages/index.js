import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeEditor from "@site/src/components/CodeEditor";


import styles from './index.module.css';

export default function Home() {
    const [code, setCode] = useState('');

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/junnei/codetree-TILs/main/240114/%EA%B7%B8%EB%9E%98%ED%94%84%20%ED%83%90%EC%83%89/graph-traversal.py')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // Python 코드를 가져온 후 상태에 저장합니다.
                setCode(data.trim()); // 공백 제거
            })
            .catch(error => console.error('Error fetching Python code:', error));
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

    return (
        <Layout title="Code Study">
            <main>
                <div className={styles.heroContainer}>
                    <h1>Code Study</h1>
                    <p className={styles.tagline}>코드트리 학습을 위한 코드 공유 사이트</p>
                    <Link className={"button button--primary"} href={"docs/intro"}>Let's Get Codes</Link>
                    <div className={styles.codeEditorWrapper}>
                        <CodeEditor code={code} showButtons/>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
