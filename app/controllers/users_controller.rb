class UsersController < ApplicationController
require 'csv'
skip_before_filter  :verify_authenticity_token

  def new
  	@user = User.new
  end
  
  def create 
  	@user = User.new(:email => params[:email])
  	if @user.save
  		respond_to do |format|
        format.html {redirect_to :action => 'new'}
        format.js { render( :json => ["OK"] ) }
      end
  		#UserMailer.registration_confirmation(@user).deliver
  	else 
  		respond_to do |format|
        format.html
        format.js {render( :json => @user.errors, :status => 400)}
      end
  	end
  end
  
  def index 
  	@users = User.all 
  end
  
  def export_csv
  	@users = User.all 
  	user_csv = CSV.generate do |csv|
  		#header row
  		csv <<["Email", "UserType"]
  		#data row
	  	@users.each do |user|
  		csv <<[user.email, user.usertype]
  		end	
  	end
  	send_data(user_csv, :type => 'text/csv', :filename => 'user_record.csv')
  end
end
