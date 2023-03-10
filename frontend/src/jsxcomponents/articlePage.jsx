import '../cssfiles/articlePage/mainPageArticle.css'
import Discussions from '../articlePageComponents/discussions'
import ArticleData from '../articlePageComponents/articleData'
import Footer from '../StandardComponents/JsxFiles/Footer'
import Button from '../StandardComponents/JsxFiles/button'
import Line from '../StandardComponents/JsxFiles/line'


function ArticlePage(props){

    return (
        <div>
            <div className = "article_page_header">
                <div className = "article_page_proName">NewsKnot</div>
                <div className = "article_page_btns">
                <div className = "article_page_feed_btn"><Button link = '/user' >Feed</Button></div>
                <div></div>
                </div>
            </div>
            <ArticleData></ArticleData>
            <Line></Line>
            <Discussions></Discussions>
            <Line></Line>
            <Footer></Footer>
        </div>
    )

}

export default ArticlePage;