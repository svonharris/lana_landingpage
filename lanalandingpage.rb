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
	# attr_accessor :phonenumber, :firstname, :lastname, :emailaddress
	
	@@errors = []

	def anyErrors
		if @@errors.empty?
			return true
		else
			return @@errors
		end
	end

	def parseForm(form)
		form.each { |key, value| 
			if key === "fname"
				@firstname = value
			elsif key === "lname"
				@lastname = value
			elsif key === "email"
				@emailaddress = value
				Customer.email(value)
			elsif key === "phone"
				@phonenumber = value
				binding.pry
				Customer.number(value)
			else 
				return false
			end
		}
	end

	def self.number(phonenumber)
		binding.pry
		if phonenumber === "" || phonenumber === " "
			# return true;
		else
			n = phonenumber
			if n.length === 10
				if /\D/ === n
					@@errors << "phone"
				else
					# puts "true"
				end
			else
				@@errors << "phone"
			end
		end
	end

	def self.email(emailaddress)
		if emailaddress === "" || emailaddress === " "
			@@errors << "email"
		else
			e = emailaddress
			if /^[\w\.\-\_\+]+@[\w-]+\.\w{2,4}$/ === e
				# return true
			else
				@@errors << "email"
			end
		end
		# binding.pry
	end

end


################################################

get '/' do
	if session[:printError].nil? === false
		flash[:firstn] = "Aplhabetical characters only"
		flash[:lastn] = "Alphabetical characters only"
		flash[:email] = "Email address incorrect"
		flash[:phone] = "Must have 10 digits"

		session[:printError].each do |index|
			if index === "fname"
				@firstn = "#{flash[:firstn]}"
			elsif index === "lname"
				@lastn = "#{flash[:lastn]}"
			elsif index === "email"
				@email = "#{flash[:email]}"
			elsif index === "phone"
				@phone = "#{flash[:phone]}"
			end
		end
		session.clear
	end

	erb :lanalandingpage
end

post '/signup' do
	session[:data] = Customer.new
	session[:data].parseForm(params)

	collectError = session[:data].anyErrors
	if collectError === true
		redirect to('/thankyou')
	else
		session[:printError] = collectError
		redirect to('/')
	end
end





post '/signup_js' do
	session[:data] = Customer.new
	form = JSON.parse(params[:signup_form])
	session[:data].parseForm(form)
	
	collectError = session[:data].anyErrors
	if collectError === true
		return "success"
	else
		session[:printError] = collectError
		redirect to('/')
	end
end

get '/thankyou' do
	# binding.pry
	erb :thankyou
end
