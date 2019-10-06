import React, { useRef } from "react"
import { Link } from "gatsby"
import cardStyles from "./post-card.module.scss"
import Image from "gatsby-image"
import { stopPropCallback } from "../../utils/preventCallback"

/**
 * @param {string} title - The title of the post
 * @param {UnicornInfo[]} authors - Info on the authors of the post
 * @param {string} published - Date the author published the post
 * @param {string[]} tags - List of tags associated with the post
 * @param {string} excerpt - The autogenerated excerpt from the GraphQL call
 * @param {string} slug - The post URL slug (which is also it's unique ID)
 * @param {string} [description] - The manually written description of the post in the post frontmatter
 * @param {string} [className] - Classname to pass to the post card element
 */
export const PostCard = ({ title, authors, published, tags, excerpt, description, className, slug }) => {
  const headerLink = useRef()
  const authorLink = useRef()

  return (
    <li className={`${cardStyles.card} ${className}`} onClick={() => headerLink.current.click()} role="listitem">
      <div className={cardStyles.cardContents}>
        <Link
          to={`/posts${slug}`}
          onClick={stopPropCallback}
          className="unlink"
        >
          <h2
            className={cardStyles.header}
            ref={headerLink}
          >
            {title}
          </h2>
        </Link>
        <p className={cardStyles.authorName}
           onClick={(e) => {
             stopPropCallback(e)
             authorLink.current.click()
           }}
        >
          by&nbsp;{authors.map(author => author.name).join(", ")} {/*get comma-separated list of authors*/}
        </p>
        <div className={cardStyles.dateTagSubheader}>
          <p className={cardStyles.date}>{published}</p>
          <div>
            {
              tags.map(tag => (
                <span
                  key={tag}
                  className={cardStyles.tag}
                >
                  {tag}
                </span>
              ))
            }
          </div>
        </div>
        <p className={cardStyles.excerpt} dangerouslySetInnerHTML={{
          __html: description || excerpt,
        }}
        />
      </div>
      <div className={cardStyles.profilePicsContainer}>
        {authors.map((author, i, arr) => {
          const hasTwoAuthors = arr.length !== 1;
          const xyPosition =
            !hasTwoAuthors ? undefined :
            i === 1 ? "12px" : "-7px"

          const classesToApply = hasTwoAuthors ? cardStyles.twoAuthorPicSize : '';

          return (
            <Link
              id={author.id}
              to={`/unicorns/${author.id}`}
              ref={authorLink}
              onClick={stopPropCallback}
              className={cardStyles.profilePicLink}
              style={{
                borderColor: author.color,
                left: xyPosition,
                top: xyPosition,
              }}
            >
              <Image
                data-testid="authorPic"
                fixed={author.profileImg.childImageSharp.smallPic}
                alt={author.name}
                className={`${cardStyles.profilePic} ${classesToApply}`}
                imgStyle={{
                  borderRadius: `50%`,
                }}
              />
            </Link>
          )
        })}
      </div>
    </li>
  )
}

