require "sinatra"
require "pry"
require "sinatra/reloader" if development?
require "logger"
require "ap"
require "pp"
require "json"
require "logger"
require 'sinatra/flash'
enable :logger
enable :sessions

################################################

class Customer
	attr_accessor :phonenumber, :firstname, :lastname, :emailaddress
	
	@@errors = []

	def anyErrors
		if @@errors.empty?
			return true
		else
			# return @@errors
			Customer.compare
		end
	end
	
	# def self.compare
	# 	@printError = {}
	# 	for error in @@errors
	# 		if error === "email"
	# 	 		#puts "yes email"
		 		# @printError["email"] = "#{flash[:email]}"
	#  		elsif error === "phone"
	#  			#puts "yes phone"
	#  			@printError["phone"] = "#{flash[:phone]}"
	# 	 	end
	# 	 end
	# 	 return @printError
	# end

	def self.compare
		@collectError = []
		for error in @@errors
			if error === "email"
		 		@collectError << "email"
	 		elsif error === "phone"
	 			#puts "yes phone"
	 			@collectError << "phone"
		 	end
		 end
		 return @collectError
	end

	def parseForm(form)
		form.each { |key, value| 
			if key === "fname"
				@firstname = value
			elsif key === "lname"
				@lastname = value
			elsif key === "email"
				@emailaddress = value
				Customer.email
			elsif key === "phone"
				@phonenumber = value
				Customer.number
			else 
				return false
			end
			# binding.pry
		}
	end

	def self.number
		# binding.pry
		if @phonenumber === "" || @phonenumber === " " || @phonenumber.nil?
			# return true;
		else
			n = @phonenumber
			if n.length === 10
				if /\D/ === n
					@@errors << "phone"
				else
					puts "true"
				end
			else
				@@errors << "phone"
			end
		end
	end

	def self.email
		if @emailaddress === "" || @emailaddress === " "
			@@errors << "email"
		else
			e = @emailaddress
			if /^[\w\.\-\_\+]+@[\w-]+\.\w{2,4}$/ === e
				# return true
			else
				@@errors << "email"
			end
		end
		# binding.pry
	end

end

################################################ Object {fname: "she", lname: "har", email: "a@a.com", phone: ""}

get '/' do
	binding.pry
	if session[:printError].nil? === false
		flash[:firstn] = "Alphabetical characters only"
		flash[:lastn] = "Alphabetical characters only"
		flash[:email] = "Email address incorrect"
		flash[:phone] = "Must have 10 digits"
		session[:printError].each do |index|
			if index === "email"
				@email = "#{flash[:email]}"
			elsif index === "phone"
				@phone = "#{flash[:phone]}"
			end
		end
	end
	erb :lanalandingpage
end

post '/signup' do
	session[:data] = Customer.new
	session[:data].parseForm(params)
	# binding.pry
	collectError = session[:data].anyErrors
	if collectError === true
		redirect to('/thankyou')
	else
		# binding.pry
		session[:printError] = collectError
		redirect to('/')
	end
end

post '/signup_js' do
	session[:data] = Customer.new
	form = JSON.parse(params[:signup_form])
	session[:data].parseForm(form)
	session[:data].number
	session[:data].email
	# binding.pry
	# redirect to('/thankyou')
	return "success"
end

get '/thankyou' do
	# binding.pry
	erb :thankyou
end
