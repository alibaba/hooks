import { useBoolean } from 'ahooks';
import Mock from 'mockjs';
import React from 'react';
import { useRequest } from 'ahooks';

async function getArticle(): Promise<{ data: string; time: number }> {
    console.log('cacheKey');
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: Mock.mock('@paragraph'),
                time: new Date().getTime(),
            });
        }, 1000);
    });
}

const Article = () => {
    const { data, loading } = useRequest(getArticle, {
        cacheKey: 'cacheKey-demo',
        getCache: (cacheKey) => {
            console.log('AAAAAAAAAAA', cacheKey)
            return JSON.parse(localStorage.getItem(cacheKey));
        },
        setCache: (cacheKey, data) => {
            localStorage.setItem(cacheKey, JSON.stringify(data));
        }
    });
    if (!data && loading) {
        return <p>Loading</p>;
    }
    return (
        <>
            <p>Background loading: {loading ? 'true' : 'false'}</p>
            <p>{data?.data}</p>
        </>
    );
};

export default () => {
    const [state, { toggle }] = useBoolean();
    return (
        <div>
            <button type="button" onClick={() => toggle()}>
                show/hidden
            </button>
            {state && <Article />}
        </div>
    );
};
