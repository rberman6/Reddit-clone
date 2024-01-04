import DeletePost from "@/components/DeletePost.jsx";
import Votes from "@/components/Votes.jsx";
import currentDate from "@/lib/currentDate.js";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import { FaReddit } from "react-icons/fa";

export default async function Subreddit({ params }) {
  const date = currentDate();
  const user = await fetchUser();
  // you want to show posts associated with this subreddit using params.
  // Access the parameter below
  const { subredditId } = params;
  const subreddit = await prisma.subreddit.findFirst({
    where: { id: subredditId },
  });

  const posts = await prisma.post.findMany({
    where: { subredditId, parentId: null },
    include: { user: true },
  });

  return (
    <section id="subreddit-id" className="wrapper">
      <div className="subreddit-title">
        <FaReddit className="subreddit-icon" />
        <h2 className="subreddit-id-title">r/{subreddit.name}</h2>
      </div>
      {posts.map((post) => (
        <div key={post.id} className="subreddit-main-container">
          <Votes post={post} />
          <div className="subreddit-post-container">
            <div className="profile-icon-container">
              <p className="posted-by-text">Posted by </p>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  width="30px"
                  height="30px"
                >
                  <circle cx="78" cy="14" r="1" fill="#f1bc19" />
                  <circle cx="50" cy="50" r="38" fill="#f9dbd2" />
                  <circle cx="84" cy="16" r="4" fill="#f1bc19" />
                  <circle cx="14" cy="26" r="2" fill="#ee3e54" />
                  <circle cx="78" cy="77" r="2" fill="#fbcd59" />
                  <circle cx="17" cy="78" r="4" fill="#fbcd59" />
                  <circle cx="24" cy="83" r="2" fill="#ee3e54" />
                  <circle cx="64.483" cy="78.517" r="2.483" fill="#fff" />
                  <circle cx="16" cy="48" r="1" fill="#fff" />
                  <circle cx="86" cy="31" r="1" fill="#f1bc19" />
                  <circle cx="84" cy="45" r="2" fill="#fff" />
                  <circle cx="29" cy="47" r="5.3" fill="#fff" />
                  <path
                    fill="#472b29"
                    d="M29,42.4c2.536,0,4.6,2.063,4.6,4.6s-2.064,4.6-4.6,4.6s-4.6-2.063-4.6-4.6S26.464,42.4,29,42.4 M29,41c-3.314,0-6,2.687-6,6s2.686,6,6,6s6-2.687,6-6S32.314,41,29,41L29,41z"
                  />
                  <g>
                    <circle cx="72" cy="47" r="5.3" fill="#fff" />
                    <path
                      fill="#472b29"
                      d="M72,42.4c2.536,0,4.6,2.063,4.6,4.6s-2.064,4.6-4.6,4.6s-4.6-2.063-4.6-4.6S69.464,42.4,72,42.4 M72,41c-3.314,0-6,2.687-6,6s2.686,6,6,6s6-2.687,6-6S75.314,41,72,41L72,41z"
                    />
                  </g>
                  <g>
                    <ellipse
                      cx="50.5"
                      cy="54"
                      fill="#fff"
                      rx="24.8"
                      ry="16.3"
                    />
                    <path
                      fill="#472b29"
                      d="M50.5,38.4c13.289,0,24.1,6.998,24.1,15.6S63.789,69.6,50.5,69.6S26.4,62.602,26.4,54 S37.211,38.4,50.5,38.4 M50.5,37C36.417,37,25,44.611,25,54s11.417,17,25.5,17S76,63.389,76,54S64.583,37,50.5,37L50.5,37z"
                    />
                  </g>
                  <g>
                    <path
                      fill="#472b29"
                      d="M61.648,65.891c-0.103,0-0.198-0.063-0.235-0.165c-0.047-0.13,0.021-0.273,0.15-0.32 c2.902-1.049,5.403-2.518,7.233-4.249c0.102-0.095,0.26-0.09,0.354,0.01c0.095,0.1,0.091,0.259-0.01,0.353 c-1.88,1.778-4.441,3.284-7.407,4.356C61.705,65.886,61.677,65.891,61.648,65.891z"
                    />
                  </g>
                  <g>
                    <path
                      fill="#472b29"
                      d="M70.658,59.666c-0.051,0-0.102-0.015-0.146-0.047c-0.112-0.08-0.138-0.236-0.058-0.349 C71.646,57.604,72.25,55.83,72.25,54c0-1.689-0.518-3.335-1.537-4.894c-0.076-0.116-0.043-0.271,0.072-0.346 c0.114-0.075,0.27-0.043,0.346,0.072c1.074,1.641,1.619,3.38,1.619,5.168c0,1.937-0.636,3.808-1.889,5.562 C70.813,59.63,70.736,59.666,70.658,59.666z"
                    />
                  </g>
                  <g>
                    <path
                      fill="#472b29"
                      d="M32.179,46.522c-0.066,0-0.132-0.026-0.182-0.078c-0.095-0.1-0.09-0.259,0.01-0.353 c1.88-1.778,4.441-3.284,7.408-4.356c0.128-0.047,0.273,0.02,0.32,0.15c0.047,0.13-0.021,0.273-0.15,0.32 c-2.902,1.049-5.404,2.518-7.234,4.249C32.303,46.499,32.241,46.522,32.179,46.522z"
                    />
                  </g>
                  <g>
                    <path
                      fill="#472b29"
                      d="M30.226,58.891c-0.081,0-0.161-0.04-0.209-0.113c-1.074-1.641-1.619-3.38-1.619-5.168 c0-1.936,0.636-3.807,1.889-5.562c0.081-0.112,0.236-0.138,0.349-0.058c0.112,0.08,0.138,0.236,0.058,0.349 c-1.192,1.668-1.796,3.441-1.796,5.271c0,1.689,0.517,3.335,1.537,4.894c0.076,0.116,0.043,0.271-0.072,0.346 C30.321,58.878,30.273,58.891,30.226,58.891z"
                    />
                  </g>
                  <g>
                    <circle cx="69.5" cy="29.5" r="3.8" fill="#fff" />
                    <path
                      fill="#472b29"
                      d="M69.5,26.4c1.709,0,3.1,1.391,3.1,3.1s-1.391,3.1-3.1,3.1s-3.1-1.391-3.1-3.1 S67.791,26.4,69.5,26.4 M69.5,25c-2.485,0-4.5,2.015-4.5,4.5s2.015,4.5,4.5,4.5s4.5-2.015,4.5-4.5S71.985,25,69.5,25L69.5,25z"
                    />
                  </g>
                  <g>
                    <circle cx="42" cy="51" r="3.5" fill="#ee3e54" />
                    <path
                      fill="#472b29"
                      d="M42,55c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S44.206,55,42,55z M42,48c-1.654,0-3,1.346-3,3 s1.346,3,3,3s3-1.346,3-3S43.654,48,42,48z"
                    />
                  </g>
                  <g>
                    <circle cx="59" cy="51" r="3.5" fill="#ee3e54" />
                    <path
                      fill="#472b29"
                      d="M59,55c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S61.206,55,59,55z M59,48c-1.654,0-3,1.346-3,3 s1.346,3,3,3s3-1.346,3-3S60.654,48,59,48z"
                    />
                  </g>
                  <g>
                    <path
                      fill="#472b29"
                      d="M50.5,38c-0.052,0-0.105-0.008-0.158-0.026c-0.262-0.087-0.403-0.37-0.316-0.632l4-12 c0.084-0.25,0.347-0.394,0.604-0.325l11.25,3c0.267,0.071,0.426,0.345,0.354,0.612c-0.071,0.266-0.342,0.426-0.612,0.354 l-10.796-2.879l-3.851,11.554C50.904,37.868,50.709,38,50.5,38z"
                    />
                  </g>
                  <g>
                    <path
                      fill="#472b29"
                      d="M50.437,64.363c-2.78,0-5.538-0.812-8.198-2.436c-0.235-0.144-0.31-0.452-0.166-0.687 c0.144-0.236,0.452-0.31,0.688-0.166c5.053,3.086,10.265,3.084,15.484-0.004c0.236-0.14,0.544-0.062,0.686,0.176 c0.141,0.238,0.062,0.544-0.176,0.685C56.013,63.552,53.214,64.363,50.437,64.363z"
                    />
                  </g>
                </svg>
              </span>
              <p className="posted-by-text">
                {" "}
                u/{post.user.username} • {date}
              </p>
            </div>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-message">{post.message}</p>
            {/* only show edit & delete button if its the user that posted post */}
            {/* delete, edit & reply buttons */}
            <div className="edit-delete-btn-container">
              {user.username === post.user.username && (
                <>
                  <DeletePost subredditId={subredditId} post={post} />
                  <Link href={`/subreddits/${subreddit.id}/${post.id}`}>
                    <button className="edit-btn">
                      <svg
                        width="25px"
                        height="25px"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M834.3 705.7c0 82.2-66.8 149-149 149H325.9c-82.2 0-149-66.8-149-149V346.4c0-82.2 66.8-149 149-149h129.8v-42.7H325.9c-105.7 0-191.7 86-191.7 191.7v359.3c0 105.7 86 191.7 191.7 191.7h359.3c105.7 0 191.7-86 191.7-191.7V575.9h-42.7v129.8z" />
                        <path d="M889.7 163.4c-22.9-22.9-53-34.4-83.1-34.4s-60.1 11.5-83.1 34.4L312 574.9c-16.9 16.9-27.9 38.8-31.2 62.5l-19 132.8c-1.6 11.4 7.3 21.3 18.4 21.3 0.9 0 1.8-0.1 2.7-0.2l132.8-19c23.7-3.4 45.6-14.3 62.5-31.2l411.5-411.5c45.9-45.9 45.9-120.3 0-166.2zM362 585.3L710.3 237 816 342.8 467.8 691.1 362 585.3zM409.7 730l-101.1 14.4L323 643.3c1.4-9.5 4.8-18.7 9.9-26.7L436.3 720c-8 5.2-17.1 8.7-26.6 10z m449.8-430.7l-13.3 13.3-105.7-105.8 13.3-13.3c14.1-14.1 32.9-21.9 52.9-21.9s38.8 7.8 52.9 21.9c29.1 29.2 29.1 76.7-0.1 105.8z" />
                      </svg>
                    </button>
                  </Link>
                </>
              )}
              <Link href={`/posts/${post.id}`}>
                <button className="reply-btn">
                  <img src="/comment-icon.png" alt="comment-icon" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
