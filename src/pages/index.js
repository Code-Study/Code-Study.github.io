import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeEditor from "@site/src/components/CodeEditor";


import styles from './index.module.css';

export default function Home() {
    const [codes, setCodes] = useState([]);
    const [names, setNames] = useState([]);
    const [files, setFiles] = useState([]);
    const [members, setMembers] = useState([]);

    const axios = require('axios');

    useEffect(() => {
        setCodes(["print(1)", "print(2)", "print(3)", "print(4)"]);
        setNames(["junnei1", "junnei2", "junnei3", "junnei4"]);
        fetchFiles()
        fetchMembers()
    }, []);

    const fetchMembers = async (org = "Code-Study", token = null) => {
        try {
            const options = token
                ? {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { filter: 'all' },
                    }
                : {};
            const response = await axios.get(`https://api.github.com/orgs/${org}/members`, options);
            //console.log('Organization Members:', response.data);

            const members = response.data.map((member) => ({
                login: member.login,
                avatar_url: member.avatar_url,
                html_url: member.html_url,
            }));
            setMembers(members);
            return members;
        } catch (error) {
            console.error('Error fetching organization members:', error);
        }
    };
      
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
                        <h1>Members</h1>
                        <div className={styles.memberContainer}>
                            {members.map((member, index) => (
                                <a href={member.html_url} key={member.login} target="_blank" rel="noopener noreferrer" className={styles.memberCard}>
                                    <img src={member.avatar_url} alt={`${member.login}'s avatar`} className={styles.memberAvatar} />
                                    <p className={styles.memberName}>{member.login}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
