class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  # application_controllerにbefore_actionを使用しているため、全てのアクションが実行される前に、この部分が実行されることになります。deviseのコントローラーから呼び出された場合は、「configure_permitted_parameters」メソッドが呼ばれます。
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
