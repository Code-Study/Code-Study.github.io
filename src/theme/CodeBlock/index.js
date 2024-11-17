import React, { useState, useEffect, isValidElement } from "react";
import useIsBrowser from "@docusaurus/useIsBrowser";
import ElementContent from "@theme/CodeBlock/Content/Element";
import StringContent from "@theme/CodeBlock/Content/String";
import CodeEditor from "@site/src/components/CodeEditor";
/**
 * Best attempt to make the children a plain string so it is copyable. If there
 * are react elements, we will not be able to copy the content, and it will
 * return `children` as-is; otherwise, it concatenates the string children
 * together.
 */
function maybeStringifyChildren(children) {
  if (React.Children.toArray(children).some((el) => isValidElement(el))) {
    return children;
  }
  // The children is now guaranteed to be one/more plain strings
  return Array.isArray(children) ? children.join("") : children;
}

export default function CodeBlock({ children: rawChildren, ...props }) {
  const [codes, setCodes] = useState([]); // 코드를 담을 상태
  const [names, setNames] = useState([]);
  const [members, setMembers] = useState([]);

  const axios = require('axios');

  const fetchMembers = async (org = "Code-Study", token = null) => {
    try {
        const options = token
            ? {
                headers: { Authorization: `Bearer ${token}` },
                params: { filter: 'all' },
                }
            : {};
        const response = await axios.get(`https://api.github.com/orgs/${org}/members`, options);

        const members = response.data.map((member) => (
            member.login
        ));
        setMembers(members)
        return members;
    } catch (error) {
        console.error('Error fetching organization members:', error);
    }
  };

  const getRepositoryContents = async (owner, repo, path = '') => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching repository contents:', error);
      return [];
    }
  };

  const getFilesRecursively = async (owner, repo, path = '') => {
      let files = [];
      const contents = await getRepositoryContents(owner, repo, path);
      
      for (const content of contents) {
        if (content.type === 'file') {
          // 파일인 경우 목록에 추가
          files.push(content.path);
        } else if (content.type === 'dir') {
          // 폴더인 경우 재귀적으로 해당 폴더의 파일을 가져옴
          const subFiles = await getFilesRecursively(owner, repo, content.path);
          files = files.concat(subFiles);
        }
      }
      return files;
  };

  const getRepositoryFileContent = async (owner, repo, path) => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
      const content = decodeURIComponent(escape(window.atob(response.data.content))); // 디코딩
      return content;
    } catch (error) {
      console.error('Error fetching file content:', error);
      return null;
    }
  };
  
  const fetchCodes = async () => {
    try {
      // const pattern = /^[a-zA-Z]+-[a-zA-Z]+\/\d+\/\d+\/\d+$/;
      // const pattern = /^[a-zA-Z]+-[a-zA-Z]+\/[a-zA-Z]+-\d+\/\d+-[a-zA-Z]+-[a-zA-Z]+\/\d+$/;
      const pattern = /^(leet-code|novice-high)\/.+\/.+\/.+$/;
      if ((pattern.test(props.metastring) === true) && (props.className === "language-python")) {
        const contents = await getFilesRecursively('Code-Study', 'Code', props.metastring);
        const codePromises = contents.map(element =>
          getRepositoryFileContent('Code-Study', 'Code', element)
        );
        const codeContents = await Promise.all(codePromises);
        setCodes(codeContents);
        //console.log(contents.map(elem => elem.split('/').pop().split('.')[0]));
        setNames(contents.map(elem => elem.split('/').pop().split('.')[0]));
      } else {
        const memberContents = await fetchMembers('Code-Study');
        const fileName = props.metastring+'/'+props.metastring+'.py'
        memberContents.map(async member =>  {
          const contents = await getRepositoryFileContent(member, 'LeetCode', fileName);
          if (contents !== null) {
            setNames((prevNames) => [...prevNames, member]);
            setCodes((prevCodes) => [...prevCodes, contents]);
          }
        });
      }
    } catch (error) {
      console.error('Error fetching codes:', error);
    }
  };

  useEffect(() => {
    fetchCodes();
  }, [props.metastring]);

  return (
    <>
      {codes.length > 0 ? (
        <CodeEditor names={names} codes={codes} showButtons />
      ) : (
        <CodeEditor names={["Code-Study"]} codes={["No code has been solved yet!"]} showButtons />
      )}
    </>
  );
}