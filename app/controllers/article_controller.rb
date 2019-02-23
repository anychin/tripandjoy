class ArticleController < ApplicationController
  def get
    @article = Article.where(:url => params[:url], :public => true).first || not_found
  end
end
