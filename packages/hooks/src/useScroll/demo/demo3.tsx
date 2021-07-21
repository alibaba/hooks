/**
 * title: Custom update
 * desc: listen on scroll event between 100px ~ 200px in vertical direction
 *
 * title.zh-CN: 自定义更新
 * desc.zh-CN: 在垂直方向 100px 到 200px 的滚动范围内监听
 */

import React, { useRef } from 'react';
import { useScroll } from 'ahooks';

export default () => {
  const ref = useRef(null);

  const scroll = useScroll(ref, (val) => val.top > 100 && val.top < 200);

  return (
    <>
      <p>{JSON.stringify(scroll)}</p>
      <div
        style={{
          height: '160px',
          width: '160px',
          border: 'solid 1px #000',
          overflow: 'scroll',
          whiteSpace: 'nowrap',
          fontSize: '36px',
        }}
        ref={ref}
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur atque, debitis ex
          excepturi explicabo iste iure labore molestiae neque optio perspiciatis
        </div>
        <div>
          Aspernatur cupiditate, deleniti id incidunt mollitia omnis! A aspernatur assumenda
          consequuntur culpa cumque dignissimos enim eos, et fugit natus nemo nesciunt
        </div>
        <div>
          Alias aut deserunt expedita, inventore maiores minima officia porro rem. Accusamus ducimus
          magni modi mollitia nihil nisi provident
        </div>
        <div>
          Alias aut autem consequuntur doloremque esse facilis id molestiae neque officia placeat,
          quia quisquam repellendus reprehenderit.
        </div>
        <div>
          Adipisci blanditiis facere nam perspiciatis sit soluta ullam! Architecto aut blanditiis,
          consectetur corporis cum deserunt distinctio dolore eius est exercitationem
        </div>
        <div>Ab aliquid asperiores assumenda corporis cumque dolorum expedita</div>
        <div>
          Culpa cumque eveniet natus totam! Adipisci, animi at commodi delectus distinctio dolore
          earum, eum expedita facilis
        </div>
        <div>
          Quod sit, temporibus! Amet animi fugit officiis perspiciatis, quis unde. Cumque
          dignissimos distinctio, dolor eaque est fugit nisi non pariatur porro possimus, quas quasi
        </div>
      </div>
    </>
  );
};
