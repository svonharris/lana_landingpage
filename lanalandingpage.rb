require "sinatra"
require "pry"
require "sinatra/reloader"
require "logger"
require 'ap'
#require "pp"
require 'json'
require 'logger'
enable :logger
enable :sessions

################################################

class Customer
	# def initialize(person)
	# 	@person = person
	# end

	def parseForm(form)
		customerdata = form
		customerdata.each { |key, value| puts "#{key} is #{value}"}
	end
end

################################################ Object {fname: "she", lname: "har", email: "a@a.com", phone: ""}

get '/' do
	erb :lanalandingpage
end

post '/signup' do
	new_customer = Customer.new
	form = JSON.parse(params[:signup_form])
	new_customer.parseForm(form)
	redirect to('/yes')
	#http://stackoverflow.com/questions/11210366/ruby-on-rails-send-javascript-array-of-arrays-to-ruby-controller
	#https://hackhands.com/ruby-read-json-file-hash/
	#https://www.safaribooksonline.com/library/view/ruby-cookbook/0596523696/ch05s07.html
end

get '/yes' do
	erb :cheese
end