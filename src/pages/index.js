import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeEditor from "@site/src/components/CodeEditor";


import styles from './index.module.css';

export default function Home() {
    const [codes, setCodes] = useState([]);
    const [names, setNames] = useState([]);
    const [files, setFiles] = useState([]);

    const axios = require('axios');

    useEffect(() => {
        setCodes(["print(1)", "print(2)", "print(3)", "print(4)"]);
        setNames(["junnei1", "junnei2", "junnei3", "junnei4"]);
        fetchFiles()
    }, []);


    const fetchTreeSHA = async (owner = "Code-Study", repo = "Code", branch = "main") => {
        try {
          const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/branches/${branch}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching repository contents:', error);
          return [];
        }
    };

    const fetchFiles = async (owner = "Code-Study", repo = "Code", branch = "main", recursive = true) => {
        try {
          const responseBranch = await fetchTreeSHA(owner, repo, branch)
          const treeSHA = responseBranch["commit"]["commit"]["tree"]["sha"]
          //console.log(treeSHA)
          const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSHA}`, {
            params: {
                recursive: recursive ? "true" : "false"
            }
          });
          const data = response.data;
            data.tree.forEach(item => {
            if (item.type === 'blob') {
                setFiles(prevFiles => [...prevFiles, { type: 'file', path: item.path }]);
            }
          })
        } catch (error) {
          console.error('Error fetching repository contents:', error);
          return [];
        }
    };

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

                    <div>
                        <h1>Recent Uploads</h1>
                        <ul>
                            {files.map((file, index) => (
                            <li key={index}>{file.path}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
