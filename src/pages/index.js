import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeEditor from "@site/src/components/CodeEditor";


import styles from './index.module.css';

export default function Home() {
    const [codes, setCodes] = useState([]);
    const [names, setNames] = useState([]);
    
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
                setCodes(["print(1)", "print(2)", "print(3)", "print(4)"]);
                setNames(["junnei", "junnei", "junnei", "junnei"]);
            })
            .catch(error => console.error('Error fetching Python code:', error));
    }, []);
    
    return (
        <Layout title="Code Study">
            <main>
                <div className={styles.heroContainer}>
                    <h1>Code Study</h1>
                    <p className={styles.tagline}>코딩 테스트 학습을 위한 코드 공유 사이트</p>
                    <Link className={"button button--primary"} href={"docs/intro"}>Let's Get Codes</Link>
                    <div className={styles.codeEditorWrapper}>
                        <CodeEditor names={names} codes={codes} showButtons/>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
