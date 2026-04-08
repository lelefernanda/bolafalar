<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl sm:text-2xl font-bold text-green-600">Área do Professor</h1>
          </div>

          <nav class="hidden lg:flex items-center space-x-1">
            <button
              v-for="item in menuItems"
              :key="item.id"
              @click="activeSection = item.id"
              :class="activeSection === item.id ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'"
              class="nav-link px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200"
            >
              <span class="flex items-center gap-2">
                <component :is="item.icon" class="w-4 h-4" />
                <span class="hidden xl:inline">{{ item.label }}</span>
              </span>
            </button>
          </nav>

          <div class="flex items-center gap-3">
            <div class="flex items-center gap-3">
              <div class="hidden sm:block text-right">
                <p class="text-sm font-medium text-gray-900">{{ user?.name }}</p>
                <p class="text-xs text-gray-500">Professora</p>
              </div>
              <button @click="activeSection = 'about'" class="cursor-pointer relative">
                <div v-if="user?.photo" class="w-10 h-10 rounded-full overflow-hidden border-2 border-green-500 hover:border-green-600 transition-colors">
                  <img :src="user.photo" alt="Foto de perfil" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold border-2 border-transparent hover:border-green-600 transition-colors">
                  {{ user?.name?.charAt(0).toUpperCase() }}
                </div>
                <label @click.stop class="absolute bottom-0 right-0 cursor-pointer">
                  <input @change="handlePhotoUpload" type="file" accept="image/*" class="hidden" ref="photoInput" />
                  <div class="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white text-xs hover:bg-green-700">+</div>
                </label>
              </button>
            </div>
            <button
              @click="handleLogout"
              class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Sair"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="lg:hidden border-t border-gray-200 px-4 py-2">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="item in menuItems"
            :key="item.id"
            @click="activeSection = item.id"
            :class="activeSection === item.id ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'"
            class="px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1"
          >
            <component :is="item.icon" class="w-3 h-3" />
            {{ item.label }}
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div v-if="activeSection === 'about'" class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <div class="flex items-center gap-6">
            <div v-if="user?.photo" class="w-24 h-24 rounded-full overflow-hidden border-4 border-green-200">
              <img :src="user.photo" alt="Foto de perfil" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-green-200">
              {{ user?.name?.charAt(0).toUpperCase() }}
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">{{ user?.name }}</h2>
              <p class="text-gray-500">Professora</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Editar Perfil</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input v-model="editProfile.name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input v-model="editProfile.email" type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
              <input v-model="editProfile.birthDate" type="date" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nacionalidade</label>
              <select v-model="editProfile.nationality" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="">Selecione</option>
                <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nova Senha (deixe em branco para manter)</label>
              <div class="relative">
                <input v-model="editProfile.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                </button>
              </div>
            </div>
          </div>
          <div class="mt-4 flex justify-end">
            <button @click="saveProfile" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Salvar Alterações</button>
          </div>
        </div>
      </div>

      <div v-if="activeSection === 'students'" class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Meus Alunos</h2>
            <p class="text-gray-500 mt-1">Todos os alunos cadastrados</p>
          </div>
        </div>

        <div v-if="allStudents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="student in allStudents" :key="student.id" class="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md hover:border-green-200 transition-all">
            <div class="flex items-center gap-3">
              <div v-if="student.photo" class="w-12 h-12 rounded-full overflow-hidden">
                <img :src="student.photo" alt="Foto" class="w-full h-full object-cover" />
              </div>
              <div v-else class="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold text-lg">
                {{ student.name?.charAt(0).toUpperCase() }}
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">{{ student.name }}</h3>
                <p class="text-sm text-gray-500">{{ student.email }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
          <svg class="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-900">Nenhum aluno cadastrado</h3>
          <p class="mt-2 text-gray-500">Os alunos aparecerão quando se cadastrarem</p>
        </div>
      </div>

      <div v-if="activeSection === 'appointments'" class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Agendamentos</h2>
            <p class="text-gray-500 mt-1">Gerencie solicitações de aula</p>
          </div>
          <button
            @click="showAppointmentForm = !showAppointmentForm"
            class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nova Aula
          </button>
        </div>

        <div v-if="showAppointmentForm" class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Agendar Nova Aula</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Título da aula</label>
              <input v-model="newAppointment.title" placeholder="Ex: Aula de Piano" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Aluno</label>
              <select v-model="newAppointment.studentUserId" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="">Selecione um aluno</option>
                <option v-for="s in allStudents" :key="s.id" :value="s.id">{{ s.name }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Data e hora</label>
              <input v-model="newAppointment.dateTime" type="datetime-local" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Duração (minutos)</label>
              <input v-model="newAppointment.duration" type="number" placeholder="60" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea v-model="newAppointment.description" placeholder="Detalhes da aula..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 h-20"></textarea>
            </div>
          </div>
          <div class="mt-4 flex gap-2 justify-end">
            <button @click="showAppointmentForm = false" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancelar</button>
            <button @click="createAppointment" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Agendar</button>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="font-semibold text-gray-900">Solicitações Pendentes</h3>
          </div>
          <div class="divide-y divide-gray-100" v-if="pendingAppointments.length > 0">
            <div v-for="apt in pendingAppointments" :key="apt.id" class="p-4 hover:bg-gray-50 transition-colors">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-lg bg-yellow-100 flex flex-col items-center justify-center text-yellow-700">
                    <span class="text-xs font-medium">{{ formatDateShort(apt.dateTime) }}</span>
                    <span class="text-lg font-bold">{{ formatDay(apt.dateTime) }}</span>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">{{ apt.title }}</h4>
                    <p class="text-sm text-gray-500">{{ apt.studentUser?.name || 'Aluno' }} • {{ formatHour(apt.dateTime) }} • {{ apt.duration }}min</p>
                    <p v-if="apt.description" class="text-sm text-gray-400 mt-1">{{ apt.description }}</p>
                  </div>
                </div>
                <div class="flex gap-2">
                  <button @click="updateAppointmentStatus(apt.id, 'scheduled')" class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">Aceitar</button>
                  <button @click="updateAppointmentStatus(apt.id, 'cancelled')" class="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium hover:bg-red-200 transition-colors">Recusar</button>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="p-8 text-center text-gray-500">
            Nenhuma solicitação pendente
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="font-semibold text-gray-900">Aulas Agendadas</h3>
          </div>
          <div class="divide-y divide-gray-100" v-if="scheduledAppointments.length > 0">
            <div v-for="apt in scheduledAppointments" :key="apt.id" class="p-4 hover:bg-gray-50 transition-colors">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-lg bg-green-100 flex flex-col items-center justify-center text-green-700">
                    <span class="text-xs font-medium">{{ formatDateShort(apt.dateTime) }}</span>
                    <span class="text-lg font-bold">{{ formatDay(apt.dateTime) }}</span>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">{{ apt.title }}</h4>
                    <p class="text-sm text-gray-500">{{ apt.studentUser?.name || 'Aluno' }} • {{ formatHour(apt.dateTime) }} • {{ apt.duration }}min</p>
                  </div>
                </div>
                <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Agendada</span>
              </div>
            </div>
          </div>
          <div v-else class="p-8 text-center text-gray-500">
            Nenhuma aula agendada
          </div>
        </div>
      </div>

      <div v-if="activeSection === 'messages'" class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Mensagens</h2>
            <p class="text-gray-500 mt-1">Comunique-se com seus alunos</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 class="font-semibold text-gray-900 mb-3">Alunos</h3>
            <div class="space-y-2">
              <button
                v-for="student in allStudents"
                :key="student.id"
                @click="selectChatPartner(student)"
                :class="[
                  'w-full p-3 rounded-lg text-left transition-colors flex items-center gap-3',
                  selectedChatPartner?.id === student.id ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50'
                ]"
              >
                <div v-if="student.photo" class="w-10 h-10 rounded-full overflow-hidden">
                  <img :src="student.photo" alt="" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold">
                  {{ student.name?.charAt(0).toUpperCase() }}
                </div>
                <span class="font-medium text-gray-900">{{ student.name }}</span>
              </button>
              <div v-if="allStudents.length === 0" class="p-4 text-center text-gray-500 text-sm">
                Nenhum aluno ainda
              </div>
            </div>
          </div>

          <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col" style="min-height: 500px;">
            <div v-if="selectedChatPartner" class="flex flex-col h-full">
              <div class="p-4 border-b border-gray-200 flex items-center gap-3">
                <div v-if="selectedChatPartner.photo" class="w-10 h-10 rounded-full overflow-hidden">
                  <img :src="selectedChatPartner.photo" alt="" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold">
                  {{ selectedChatPartner.name?.charAt(0).toUpperCase() }}
                </div>
                <span class="font-semibold text-gray-900">{{ selectedChatPartner.name }}</span>
              </div>
              <div class="flex-1 overflow-y-auto p-4 space-y-4" style="max-height: 350px;">
                <div v-for="msg in chatMessages" :key="msg.id" class="relative">
                  <div :class="[
                    'flex',
                    msg.senderId === user?.id ? 'justify-end' : 'justify-start'
                  ]">
                    <div
                      @click="toggleMessageMenu(msg)"
                      :class="[
                        'max-w-xs lg:max-w-md p-3 rounded-lg cursor-pointer relative',
                        msg.senderId === user?.id ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-900'
                      ]"
                    >
                      <div v-if="msg.audioUrl" class="mb-1">
                        <div class="flex items-center gap-2 bg-black/20 rounded-full px-2 py-1 w-fit">
                          <button @click.stop="toggleAudio($event)" class="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/40 transition-colors" :data-audio="msg.audioUrl">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </button>
                          <div class="w-24">
                            <div class="h-1 bg-white/30 rounded-full overflow-hidden">
                              <div class="audio-progress h-full bg-white rounded-full" style="width: 0%" :data-audio="msg.audioUrl"></div>
                            </div>
                          </div>
                          <span class="text-xs text-white/70 audio-duration" :data-audio="msg.audioUrl">0:00</span>
                          <a :href="msg.audioUrl" download @click.stop class="w-6 h-6 flex items-center justify-center text-white/60 hover:text-white/90">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                      <p v-if="msg.content">{{ msg.content }}</p>
                      <div class="flex items-center gap-2 mt-1">
                        <span v-if="msg.reaction" class="text-lg">{{ msg.reaction }}</span>
                        <p :class="['text-xs', msg.senderId === user?.id ? 'text-green-100' : 'text-gray-500']">{{ formatDate(msg.createdAt) }}</p>
                      </div>
                    </div>
                  </div>
                  <div v-if="selectedMessage?.id === msg.id" :class="['absolute', msg.senderId === user?.id ? 'right-0' : 'left-0', 'z-10 bg-white rounded-lg shadow-lg border border-gray-200 p-2 mt-1']">
                    <div class="flex gap-1">
                      <button v-for="emoji in emojis" :key="emoji" @click="reactToMessage(msg.id, emoji)" class="w-8 h-8 rounded hover:bg-gray-100 flex items-center justify-center text-lg">{{ emoji }}</button>
                    </div>
                    <button v-if="msg.senderId === user?.id" @click="deleteMessage(msg.id)" class="w-full mt-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm">Apagar</button>
                  </div>
                </div>
                <div v-if="chatMessages.length === 0" class="text-center text-gray-500 py-8">
                  Inicie uma conversa com {{ selectedChatPartner.name }}
                </div>
              </div>
              <div class="p-4 border-t border-gray-200">
                <div class="flex gap-2">
                  <button @click="toggleRecording" :class="['p-2 rounded-lg transition-colors', isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-gray-600 hover:bg-gray-300']">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                  <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Digite sua mensagem..." class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                  <button @click="sendMessage" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Enviar</button>
                </div>
                <p v-if="isRecording" class="text-sm text-red-500 mt-2 animate-pulse">Gravando áudio...</p>
              </div>
            </div>
            <div v-else class="flex-1 flex items-center justify-center text-gray-500">
              Selecione um aluno para iniciar uma conversa
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeSection === 'resources'" class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Materiais</h2>
            <p class="text-gray-500 mt-1">Envie materiais para seus alunos</p>
          </div>
          <button
            @click="showResourceForm = !showResourceForm"
            class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Novo Material
          </button>
        </div>

        <div v-if="showResourceForm" class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Enviar Material</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input v-model="newResource.title" placeholder="Nome do material" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select v-model="newResource.type" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="pdf">PDF</option>
                <option value="link">Link</option>
                <option value="video">Vídeo</option>
                <option value="other">Outro</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">URL ou Arquivo</label>
              <div class="space-y-2">
                <input v-model="newResource.url" placeholder="https://..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                <div class="flex items-center gap-2">
                  <span class="text-sm text-gray-500">ou</span>
                  <label class="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span class="text-sm text-gray-600">Escolher arquivo</span>
                    <input type="file" class="hidden" @change="handleFileSelect" />
                  </label>
                  <span v-if="selectedFile" class="text-sm text-green-600">{{ selectedFile.name }}</span>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Enviar para (opcional)</label>
              <select v-model="newResource.studentUserId" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="">Todos os alunos</option>
                <option v-for="s in allStudents" :key="s.id" :value="s.id">{{ s.name }}</option>
              </select>
              <p class="text-xs text-gray-500 mt-1">Deixe vazio para enviar a todos os alunos</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea v-model="newResource.description" placeholder="Descrição do material..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 h-20"></textarea>
            </div>
          </div>
          <div class="mt-4 flex gap-2 justify-end">
            <button @click="showResourceForm = false" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancelar</button>
            <button @click="createResource" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Enviar</button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" v-if="resources.length > 0">
          <div v-for="res in resources" :key="res.id" class="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md hover:border-green-200 transition-all group relative">
            <button @click="deleteResource(res.id)" class="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity" title="Excluir">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <div class="flex items-center gap-3 mb-3">
              <span :class="['px-3 py-1 rounded-full text-xs font-medium', res.type === 'pdf' ? 'bg-red-100 text-red-700' : res.type === 'video' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700']">
                {{ res.type.toUpperCase() }}
              </span>
              <span v-if="res.studentUser" class="text-xs text-gray-500">→ {{ res.studentUser.name }}</span>
              <span v-else class="text-xs text-gray-500">→ Todos</span>
            </div>
            <h3 class="font-semibold text-gray-900">{{ res.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ res.description }}</p>
            <a v-if="res.url" :href="res.url" target="_blank" class="inline-flex items-center gap-1 mt-3 text-green-600 hover:text-green-700 text-sm font-medium">
              Acessar
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
        <div v-else class="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
          <p class="text-gray-500">Nenhum material enviado</p>
        </div>
      </div>
    </main>

    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="showDeleteModal = false">
      <div class="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Excluir Material</h3>
        <p class="text-gray-600 mb-6">Tem certeza que deseja excluir este material?</p>
        <div class="flex gap-3 justify-end">
          <button @click="showDeleteModal = false" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancelar</button>
          <button @click="confirmDelete" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const activeSection = ref('appointments')
const user = ref(null)
const photoInput = ref(null)
const selectedFile = ref(null)

const AppointmentsIcon = { template: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' }
const StudentsIcon = { template: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>' }
const MessagesIcon = { template: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>' }
const ResourcesIcon = { template: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>' }
const AboutIcon = { template: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' }

const countries = ['Brasil', 'Argentina', 'Bolívia', 'Chile', 'Colômbia', 'Equador', 'Guiana', 'Paraguai', 'Peru', 'Suriname', 'Uruguai', 'Venezuela', 'Estados Unidos', 'Canadá', 'México', 'Portugal', 'Espanha', 'França', 'Itália', 'Alemanha', 'Reino Unido', 'Outro']

const menuItems = [
  { id: 'about', label: 'Sobre', icon: AboutIcon },
  { id: 'students', label: 'Alunos', icon: StudentsIcon },
  { id: 'appointments', label: 'Agendamentos', icon: AppointmentsIcon },
  { id: 'messages', label: 'Mensagens', icon: MessagesIcon },
  { id: 'resources', label: 'Materiais', icon: ResourcesIcon }
]

const allStudents = ref([])
const appointments = ref([])
const resources = ref([])
const selectedChatPartner = ref(null)
const chatMessages = ref([])
const newMessage = ref('')
const selectedMessage = ref(null)
const isRecording = ref(false)
const mediaRecorder = ref(null)
const audioChunks = ref([])
const emojis = ['👍', '❤️', '😄', '😢', '😮', '🙏']

const showAppointmentForm = ref(false)
const showResourceForm = ref(false)
const showDeleteModal = ref(false)
const resourceToDelete = ref(null)
const editProfile = ref({ name: '', email: '', password: '', birthDate: '', nationality: '' })
const showPassword = ref(false)
const newAppointment = ref({ title: '', description: '', dateTime: '', duration: 60, studentUserId: '' })
const newResource = ref({ title: '', description: '', type: 'pdf', url: '', studentUserId: '' })

const pendingAppointments = computed(() => appointments.value.filter(a => a.status === 'pending'))
const scheduledAppointments = computed(() => appointments.value.filter(a => a.status === 'scheduled'))

const formatDate = (date) => new Date(date).toLocaleString('pt-BR')
const formatDateShort = (date) => {
  const d = new Date(date)
  return d.toLocaleDateString('pt-BR', { month: 'short' })
}
const formatDay = (date) => new Date(date).getDate()
const formatHour = (date) => new Date(date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

const loadData = async () => {
  if (!user.value) return
  allStudents.value = await $fetch('/api/all-users')
  appointments.value = await $fetch(`/api/appointments?teacherId=${user.value.id}`)
  resources.value = await $fetch(`/api/resources?teacherId=${user.value.id}`)
  editProfile.value = {
    name: user.value.name || '',
    email: user.value.email || '',
    password: '',
    birthDate: user.value.birthDate ? new Date(user.value.birthDate).toISOString().split('T')[0] : '',
    nationality: user.value.nationality || ''
  }
}

const loadChat = async () => {
  if (!user.value || !selectedChatPartner.value) return
  const messages = await $fetch(`/api/messages?userId=${user.value.id}`)
  chatMessages.value = messages.filter(m =>
    (m.senderId === user.value.id && m.receiverId === selectedChatPartner.value.id) ||
    (m.senderId === selectedChatPartner.value.id && m.receiverId === user.value.id)
  ).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
}

const selectChatPartner = async (student) => {
  selectedChatPartner.value = student
  await loadChat()
}

const handlePhotoUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = async (e) => {
    const photo = e.target.result
    await $fetch('/api/upload-photo', {
      method: 'POST',
      body: { userId: user.value.id, photo }
    })
    user.value.photo = photo
    localStorage.setItem('user', JSON.stringify(user.value))
  }
  reader.readAsDataURL(file)
}

const saveProfile = async () => {
  if (!user.value) return
  const response = await $fetch('/api/profile', {
    method: 'PATCH',
    body: { id: user.value.id, ...editProfile.value }
  })
  user.value = { ...user.value, ...response.user }
  localStorage.setItem('user', JSON.stringify(user.value))
  alert('Perfil atualizado com sucesso!')
}

const createAppointment = async () => {
  if (!newAppointment.value.title || !newAppointment.value.dateTime) return
  await $fetch('/api/appointments', {
    method: 'POST',
    body: {
      ...newAppointment.value,
      teacherId: user.value.id
    }
  })
  newAppointment.value = { title: '', description: '', dateTime: '', duration: 60, studentUserId: '' }
  showAppointmentForm.value = false
  await loadData()
}

const updateAppointmentStatus = async (id, status) => {
  await $fetch('/api/appointments/update-status', {
    method: 'PATCH',
    body: { id, status }
  })
  await loadData()
}

const toggleMessageMenu = (msg) => {
  if (selectedMessage.value?.id === msg.id) {
    selectedMessage.value = null
  } else {
    selectedMessage.value = msg
  }
}

const reactToMessage = async (id, emoji) => {
  await $fetch('/api/messages/react', {
    method: 'PATCH',
    body: { id, reaction: emoji }
  })
  selectedMessage.value = null
  await loadChat()
}

const deleteMessage = async (id) => {
  await $fetch('/api/messages/delete', {
    method: 'POST',
    body: { id }
  })
  selectedMessage.value = null
  await loadChat()
}

const sendMessage = async (audioUrl = null) => {
  if (!newMessage.value.trim() && !audioUrl) return
  if (!selectedChatPartner.value) return
  
  const payload = {
    content: newMessage.value,
    audioUrl,
    senderId: user.value.id,
    receiverId: selectedChatPartner.value.id
  }
  console.log('Sending message:', payload)
  
  await $fetch('/api/messages', {
    method: 'POST',
    body: payload
  })
  newMessage.value = ''
  await loadChat()
}

const toggleRecording = async () => {
  if (isRecording.value) {
    mediaRecorder.value.stop()
    isRecording.value = false
  } else {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder.value = new MediaRecorder(stream)
      audioChunks.value = []
      
      mediaRecorder.value.ondataavailable = (e) => {
        audioChunks.value.push(e.data)
      }
      
      mediaRecorder.value.onstop = async () => {
        const audioBlob = new Blob(audioChunks.value, { type: 'audio/webm' })
        const formData = new FormData()
        formData.append('file', audioBlob, 'audio.webm')
        
        const res = await $fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        
        if (res.success) {
          await sendMessage(res.url)
        }
        
        stream.getTracks().forEach(track => track.stop())
      }
      
      mediaRecorder.value.start()
      isRecording.value = true
    } catch (err) {
      console.error('Erro ao acessar microfone:', err)
      alert('Não foi possível acessar o microfone')
    }
  }
}

const activeAudio = ref(null)

const toggleAudio = (event) => {
  const audioUrl = event.currentTarget.getAttribute('data-audio')
  const button = event.currentTarget
  const container = event.currentTarget.closest('.mb-1')
  
  if (!activeAudio.value) {
    const audio = new Audio(audioUrl)
    activeAudio.value = { audio, button, container, url: audioUrl }
    
    audio.addEventListener('loadedmetadata', () => {
      const durationSpan = container.querySelector('.audio-duration')
      const minutes = Math.floor(audio.duration / 60)
      const seconds = Math.floor(audio.duration % 60)
      durationSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`
    })
    
    audio.addEventListener('timeupdate', () => {
      const progress = container.querySelector('.audio-progress')
      const percent = (audio.currentTime / audio.duration) * 100
      progress.style.width = `${percent}%`
    })
    
    audio.addEventListener('ended', () => {
      button.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'
      container.querySelector('.audio-progress').style.width = '0%'
    })
    
    audio.play()
    button.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
  } else if (activeAudio.value.url === audioUrl) {
    const audio = activeAudio.value.audio
    if (audio.paused) {
      audio.play()
      button.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
    } else {
      audio.pause()
      button.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'
    }
  } else {
    activeAudio.value.audio.pause()
    
    const audio = new Audio(audioUrl)
    activeAudio.value = { audio, button, container, url: audioUrl }
    
    audio.addEventListener('loadedmetadata', () => {
      const durationSpan = container.querySelector('.audio-duration')
      const minutes = Math.floor(audio.duration / 60)
      const seconds = Math.floor(audio.duration % 60)
      durationSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`
    })
    
    audio.addEventListener('timeupdate', () => {
      const progress = container.querySelector('.audio-progress')
      const percent = (audio.currentTime / audio.duration) * 100
      progress.style.width = `${percent}%`
    })
    
    audio.addEventListener('ended', () => {
      button.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'
      container.querySelector('.audio-progress').style.width = '0%'
    })
    
    audio.play()
    button.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
  }
}

const createResource = async () => {
  if (!newResource.value.title) {
    alert('Por favor, insira um título')
    return
  }
  
  console.log('Creating resource with:', newResource.value)
  
  let resourceData = {
    ...newResource.value,
    teacherId: parseInt(user.value.id),
    studentUserId: newResource.value.studentUserId ? parseInt(newResource.value.studentUserId) : null
  }
  
  if (selectedFile.value) {
    console.log('Uploading file:', selectedFile.value.name)
    const formData = new FormData()
    formData.append('file', selectedFile.value)
    
    try {
      const uploadRes = await $fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      console.log('Upload response:', uploadRes)
      
      if (uploadRes.success) {
        resourceData.url = uploadRes.url
      }
    } catch (err) {
      console.error('Upload error:', err)
      alert('Erro ao fazer upload do arquivo')
      return
    }
  }
  
  console.log('Sending resource data:', resourceData)
  
  try {
    await $fetch('/api/resources', {
      method: 'POST',
      body: resourceData
    })
    
    alert('Material enviado com sucesso!')
  } catch (err) {
    console.error('Resource creation error:', err)
    alert('Erro ao criar material')
    return
  }
  
  newResource.value = { title: '', description: '', type: 'pdf', url: '', studentUserId: '' }
  selectedFile.value = null
  showResourceForm.value = false
  await loadData()
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
  }
}

const deleteResource = (id) => {
  console.log('Delete clicked for id:', id)
  resourceToDelete.value = id
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  console.log('Confirming delete for id:', resourceToDelete.value)
  try {
    await $fetch(`/api/resources/${resourceToDelete.value}`, { method: 'DELETE' })
    showDeleteModal.value = false
    resourceToDelete.value = null
    await loadData()
  } catch (error) {
    console.error('Delete error:', error)
    alert('Erro ao excluir material')
  }
}

const handleLogout = async () => {
  localStorage.removeItem('user')
  await navigateTo('/')
}

onMounted(async () => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
    await loadData()
  } else {
    await navigateTo('/')
  }
})
</script>

<style scoped>
.nav-link {
  @apply relative;
}
.nav-link::after {
  content: '';
  @apply absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300;
}
.nav-link:hover::after {
  @apply w-full;
}
</style>