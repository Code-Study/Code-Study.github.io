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

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const axios = require('axios');

        const getRepositoryContents = async (owner, repo, path = '') => {
          try {
            const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
            console.log(path);
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

        const pattern = /^[a-zA-Z]+-[a-zA-Z]+\/\d+\/\d+\/\d+$/;
        if ((pattern.test(props.metastring) === true) && (props.className === "language-python")) {
          const contents = await getFilesRecursively('Code-Study', 'Code', props.metastring);
          const codePromises = contents.map(element =>
            getRepositoryFileContent('Code-Study', 'Code', element)
          );
          const codeContents = await Promise.all(codePromises);
          setCodes(codeContents);
          console.log(contents.map(elem => elem.split('/').pop().split('.')[0]));
          setNames(contents.map(elem => elem.split('/').pop().split('.')[0]));
        }
      } catch (error) {
        console.error('Error fetching codes:', error);
      }
    };
        
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