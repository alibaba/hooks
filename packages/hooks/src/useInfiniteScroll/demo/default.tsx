import React, { useRef } from "react"
import { useInfiniteScroll } from "ahooks"
import { Data } from "ahooks/lib/useInfiniteScroll/types"

interface Result {
  list: number[]
}

function getLoadMoreList(d: Data = { list: [] }): Promise<Result> {
  const newD = new Array(10)
    .fill(d.list.length)
    .map((item, index) => item + index + 1)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list: newD,
      })
    }, 1000)
  })
}

const isOverflow = (d?: Data, max = 100) =>
  d?.list === undefined ? true : d.list.length >= max

export default () => {
  const ref = useRef<HTMLDivElement>(null)

  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll(
    (d) => getLoadMoreList(d),
    {
      target: ref,
      isNoMore: isOverflow,
    }
  )

  return (
    <div
      ref={ref}
      style={{
        height: 150,
        overflow: "auto",
        border: "1px solid",
        padding: 12,
      }}
    >
      {loading ? (
        <p>loading</p>
      ) : (
        <div>
          {data?.list?.map((item) => (
            <div
              key={item}
              style={{ padding: 12, border: "1px solid #f5f5f5" }}
            >
              item-{item}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 8 }}>
        {!noMore && (
          <button type="button" onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? "Loading more..." : "Click to load more"}
          </button>
        )}

        {noMore && <span>No more data</span>}
      </div>
    </div>
  )
}
