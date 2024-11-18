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

  const children = maybeStringifyChildren(rawChildren);
  const axios = require('axios');

  const fetchMembers = async (org = "Code-Study") => {
    try {
        const token = localStorage.getItem('githubToken');
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
        if (error.response && error.response.status === 403) {
          console.error('Error: 403 Forbidden. A token is required.');
          
          const userToken = prompt('Access denied. Please provide a valid GitHub personal access token:');
          
          if (userToken) {
            localStorage.setItem('githubToken', userToken);
            return await fetchMembers(org);
          } else {
            console.error('No token provided. Unable to access the file.');
            return null;
          }
        } else {
          console.error('Error fetching file content:', error);
          return null;
        }
    }
  };

  const getRepositoryFileContent = async (owner, repo, path) => {
    try {
      const token = localStorage.getItem('githubToken');
      const options = token
          ? {
              headers: { Authorization: `Bearer ${token}` },
              params: { filter: 'all' },
              }
          : {};
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, options);
      const content = decodeURIComponent(escape(window.atob(response.data.content))); // 디코딩
      return content;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error('Error: 403 Forbidden. A token is required.');
      } else {
        console.error('Error fetching file content:', error);
        return null;
      }
    }
  };
  
  const fetchCodes = async () => {
    try {
      const pattern = /^\d{4}-/;
      if ((pattern.test(props.metastring) === true) && (props.className === "language-python")) {
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
        <CodeEditor names={names} codes={codes} compare={children} showButtons />
      ) : (
        <CodeEditor names={["Code-Study"]} codes={["No code has been solved yet!"]} showButtons />
      )}
    </>
  );
}